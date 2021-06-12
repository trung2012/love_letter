import { INVALID_MOVE } from 'boardgame.io/core';
import { ActivePlayersArg, Ctx } from 'boardgame.io';
import { CardName, ICard, ICardToDiscard, IGameState } from './types';

import { stageNames } from './constants';

export const endturn = (G: IGameState, ctx: Ctx) => {
  endTurn(G, ctx);
};

export const endTurn = (G: IGameState, ctx: Ctx) => {
  const currentPlayer = G.players[ctx.currentPlayer];
};

export const endStage = (G: IGameState, ctx: Ctx) => {
  if (ctx.events?.endStage) {
    ctx.events.endStage();
  }
};

export const playCard = (G: IGameState, ctx: Ctx, cardIndex: number, targetPlayerId: string) => {
  ctx.effects.swoosh();
  const targetPlayer = G.players[targetPlayerId];
  const currentPlayer = G.players[ctx.currentPlayer];
  let cardToPlay = currentPlayer.hand.splice(cardIndex, 1)[0];

  targetPlayer.cardsInPlay.push(cardToPlay);
};

export const clearCardsInPlay = (G: IGameState, ctx: Ctx, targetPlayerId: string) => {
  const targetPlayer = G.players[targetPlayerId];

  while (targetPlayer.cardsInPlay.length > 0) {
    const discardedCard = targetPlayer.cardsInPlay.shift();
    if (discardedCard) {
      ctx.effects.swoosh();
    }
  }
};

const drawFromDeck = (G: IGameState, ctx: Ctx, numberOfCards: number) => {
  const currentPlayer = G.players[ctx.currentPlayer];
  const newCards: ICard[] = G.deck.slice(G.deck.length - numberOfCards, G.deck.length);
  G.deck = G.deck.slice(0, G.deck.length - numberOfCards);
  currentPlayer.hand.push(...newCards);
};

const drawOneFromDeck = (G: IGameState, ctx: Ctx) => {
  drawFromDeck(G, ctx, 1);
};

const discardHand = (G: IGameState, ctx: Ctx, targetPlayerId: string) => {
  const targetPlayer = G.players[targetPlayerId ?? ctx.currentPlayer];
  while (targetPlayer.hand.length > 0) {
    const discarded = targetPlayer.hand.pop();
    if (discarded) {
      targetPlayer.cardsInPlay.push(discarded);
    }
  }
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

const oldPhoto = (G: IGameState, ctx: Ctx) => {
  const currentPlayer = G.players[ctx.playerID ?? ctx.currentPlayer];
  currentPlayer.isProtected = true;
};

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

  if (ctx.events?.setActivePlayers) {
    ctx.events.setActivePlayers({
      value: {
        [ctx.currentPlayer]: stageNames.intellectual,
      },
      moveLimit: 2,
    });
  }
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

const putCardToBottomOfDeck = (G: IGameState, ctx: Ctx, secretCardIndex: number) => {
  const currentPlayer = G.players[ctx.currentPlayer];
  const cardToPutInDeck = currentPlayer.secretCards.splice(secretCardIndex, 1)[0];

  if (!cardToPutInDeck) return INVALID_MOVE;

  G.deck.unshift(cardToPutInDeck);
};

export const moves = {
  drawFromDeck,
  drawOneFromDeck,
  putCardToBottomOfDeck,
  discardHand,
  playCard,
  endTurn,
  endturn,
  endStage,
  groupPhoto,
  theIntellectual,
  fishGuy,
  devilsAdvocate,
  oldPhoto,
  theGhost,
  puppyLove,
};

export default moves;
