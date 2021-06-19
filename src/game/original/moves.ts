import { INVALID_MOVE } from 'boardgame.io/core';
import { Ctx } from 'boardgame.io';
import { ICard, IGamePlayer, IGameState } from './types';
import { stageNames } from './constants';
import { dealCardToPlayers, emptyPlayerHandAndCardsPlayed, resetPlayers } from './utils';

export const showdown = (G: IGameState, ctx: Ctx, roundWinners: IGamePlayer[]) => {
  const players = ctx.playOrder.map(id => G.players[id]);

  for (const player of players) {
    discardHand(G, ctx, player.id);
  }

  const playersWithCatfish = players.filter(player =>
    player.cardsInPlay.find(card => card.name === 'catfish')
  );

  if (playersWithCatfish.length === 1) {
    playersWithCatfish[0].score++;
  }

  for (const winner of roundWinners) {
    winner.score += 1;
  }
};

export const resetRound = (G: IGameState, ctx: Ctx) => {
  const { players } = G;

  for (const id in players) {
    const player = players[id];

    emptyPlayerHandAndCardsPlayed(G, player);
  }

  const oldSpareCard = G.spare.pop();
  if (oldSpareCard) {
    G.deck.push(oldSpareCard);
  }

  if (ctx?.random?.Shuffle) {
    G.deck = ctx.random?.Shuffle(G.deck);
  }

  const spareCard = G.deck.pop();

  if (spareCard) {
    G.spare.push(spareCard);
  }

  dealCardToPlayers(G);
  resetPlayers(G.players);

  const allPlayerIds = Object.keys(G.players);
  const randomPlayerId = allPlayerIds[Math.floor(Math.random() * allPlayerIds.length)];
  ctx.events?.endTurn?.({ next: G.prevWinnerIds[0] ?? randomPlayerId });
};

export const endTurn = (G: IGameState, ctx: Ctx) => {
  ctx.events?.endTurn?.();
};

export const endStage = (G: IGameState, ctx: Ctx) => {
  ctx.events?.endStage?.();
};

export const playCard = (G: IGameState, ctx: Ctx, cardIndex: number, targetPlayerId: string) => {
  ctx.effects.swoosh();
  const targetPlayer = G.players[targetPlayerId];
  const currentPlayer = G.players[ctx.playerID ?? ctx.currentPlayer];
  const cardToPlay = currentPlayer.hand.splice(cardIndex, 1)[0];

  targetPlayer.cardsInPlay.push(cardToPlay);
  currentPlayer.numMovesLeft -= 1;
};

export const drawFromDeck = (G: IGameState, ctx: Ctx, numberOfCards: number) => {
  const currentPlayer = G.players[ctx.currentPlayer];
  const newCards: ICard[] = G.deck.slice(G.deck.length - numberOfCards, G.deck.length);
  G.deck = G.deck.slice(0, G.deck.length - numberOfCards);
  currentPlayer.hand.push(...newCards);
  currentPlayer.cardDrawnAtStartLeft = 0;
};

export const drawOneFromDeck = (G: IGameState, ctx: Ctx) => {
  drawFromDeck(G, ctx, 1);
};

export const discardHand = (G: IGameState, ctx: Ctx, targetPlayerId: string) => {
  const targetPlayer = G.players[targetPlayerId];
  while (targetPlayer.hand.length > 0) {
    const discarded = targetPlayer.hand.pop();
    if (discarded) {
      targetPlayer.cardsInPlay.push(discarded);
    }
  }
};

const die = (G: IGameState, ctx: Ctx, targetPlayerId: string) => {
  const targetPlayer = G.players[ctx.playerID ?? ctx.currentPlayer];
  targetPlayer.isDead = true;
  discardHand(G, ctx, targetPlayerId);
};

const groupPhoto = (G: IGameState, ctx: Ctx, targetPlayerId: string, guess: number) => {
  const targetPlayer = G.players[targetPlayerId];
  const targetPlayerCard = targetPlayer.hand[0];

  if (targetPlayerCard.value === guess) {
    targetPlayer.isDead = true;
    ctx.effects.takeDamage();
    discardHand(G, ctx, targetPlayerId);
  }
};

const fishGuy = (G: IGameState, ctx: Ctx, targetPlayerId: string) => {
  const currentPlayer = G.players[ctx.playerID ?? ctx.currentPlayer];
  const targetPlayer = G.players[targetPlayerId];
  const cardToSee = targetPlayer.hand.pop();

  if (cardToSee) {
    currentPlayer.secretCards.push(cardToSee);
  }

  G.fishGuyState = {
    targetPlayerId,
  };
};

const devilsAdvocate = (G: IGameState, ctx: Ctx, targetPlayerId: string) => {
  const currentPlayer = G.players[ctx.playerID ?? ctx.currentPlayer];
  const currentPlayerCard = currentPlayer.hand[0];
  const targetPlayer = G.players[targetPlayerId];
  const targetPlayerCard = targetPlayer.hand[0];

  if (currentPlayerCard.value > targetPlayerCard.value) {
    targetPlayer.isDead = true;
    ctx.effects.takeDamage();
    discardHand(G, ctx, targetPlayerId);
  } else if (currentPlayerCard.value < targetPlayerCard.value) {
    currentPlayer.isDead = true;
    ctx.effects.takeDamage();
    discardHand(G, ctx, currentPlayer.id);
  }
};

const oldPhoto = (G: IGameState, ctx: Ctx) => {};

const theGhost = (G: IGameState, ctx: Ctx, targetPlayerId: string) => {
  const targetPlayer = G.players[targetPlayerId];
  const targetPlayerCard = targetPlayer.hand[0];

  discardHand(G, ctx, targetPlayerId);

  if (targetPlayerCard.name === 'perfect match') {
    targetPlayer.isDead = true;
    ctx.effects.takeDamage();
  } else {
    const cardToDraw = G.deck.pop() ?? G.spare.pop();
    if (cardToDraw) {
      targetPlayer.hand.push(cardToDraw);
    }
  }
};

const theIntellectual = (G: IGameState, ctx: Ctx) => {
  const currentPlayer = G.players[ctx.currentPlayer];
  const newCards: ICard[] = G.deck.slice(G.deck.length - 2, G.deck.length);
  G.deck = G.deck.slice(0, G.deck.length - 2);
  currentPlayer.secretCards.push(...newCards);
  const hand = currentPlayer.hand.pop();
  if (hand) {
    currentPlayer.secretCards.push(hand);
  }

  ctx.events?.setActivePlayers?.({
    value: {
      [ctx.currentPlayer]: stageNames.intellectual,
    },
    moveLimit: 2,
  });
};

const puppyLove = (G: IGameState, ctx: Ctx, targetPlayerId: string) => {
  const currentPlayer = G.players[ctx.playerID ?? ctx.currentPlayer];
  const currentPlayerCard = currentPlayer.hand.pop();
  const targetPlayer = G.players[targetPlayerId];
  const targetPlayerCard = targetPlayer.hand.pop();

  if (currentPlayerCard) {
    targetPlayer.hand.push(currentPlayerCard);
  }

  if (targetPlayerCard) {
    currentPlayer.hand.push(targetPlayerCard);
  }
};

const noFilter = (G: IGameState, ctx: Ctx) => {};
const catfish = (G: IGameState, ctx: Ctx) => {};

const perfectMatch = (G: IGameState, ctx: Ctx, targetPlayerId: string) => {
  die(G, ctx, targetPlayerId);
};

const putCardToBottomOfDeck = (G: IGameState, ctx: Ctx, secretCardIndex: number) => {
  const currentPlayer = G.players[ctx.currentPlayer];
  const cardToPutInDeck = currentPlayer.secretCards.splice(secretCardIndex, 1)[0];

  if (!cardToPutInDeck) return INVALID_MOVE;

  G.deck.unshift(cardToPutInDeck);
};

const returnCard = (G: IGameState, ctx: Ctx, targetPlayerId: string) => {
  const currentPlayer = G.players[ctx.currentPlayer];
  const targetPlayer = G.players[targetPlayerId];
  const cardToReturn = currentPlayer.secretCards.pop();
  if (cardToReturn) {
    targetPlayer.hand.push(cardToReturn);
  }

  G.fishGuyState = undefined;
};

const endRound = (G: IGameState, ctx: Ctx) => {};

export const moves = {
  drawFromDeck,
  drawOneFromDeck,
  putCardToBottomOfDeck,
  discardHand,
  playCard,
  endTurn,
  showdown,
  endStage,
  groupPhoto,
  theIntellectual,
  fishGuy,
  devilsAdvocate,
  oldPhoto,
  theGhost,
  puppyLove,
  noFilter,
  perfectMatch,
  endRound,
  die,
  catfish,
  resetRound,
  returnCard,
};

export default moves;
