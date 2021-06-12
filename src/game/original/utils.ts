import { Ctx } from 'boardgame.io';
import { IGamePlayer, IGamePlayerMap, IGameState } from './types';

export const shuffle = (ctx: Ctx, array: any[]) => {
  return (array = ctx.random?.Shuffle ? ctx.random.Shuffle(array) : array);
};

export const getNumPointsToWin = (numPlayers: number) => {
  if (numPlayers <= 2) return 6;
  if (numPlayers <= 4) return 4;
  if (numPlayers <= 6) return 3;
};

export const resetRound = (G: IGameState, ctx: Ctx) => {
  const { players } = G;

  for (const id in players) {
    const player = players[id];

    emptyPlayerHandAndCardsPlayed(G, player);
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
};

export const resetPlayers = (players: IGamePlayerMap) => {
  for (const playerId in players) {
    const player = players[playerId];
    const newPlayer = {
      ...player,
      isDead: false,
      numMovesLeft: 1,
      cardDrawnAtStartLeft: 1,
    };

    players[playerId] = newPlayer;
  }
};

export const emptyPlayerHandAndCardsPlayed = (G: IGameState, player: IGamePlayer) => {
  while (player.hand.length > 0) {
    const card = player.hand.pop();
    if (card) {
      G.deck.push(card);
    }
  }

  while (player.cardsInPlay.length > 0) {
    const card = player.cardsInPlay.pop();
    if (card) {
      G.deck.push(card);
    }
  }
};

export const dealCardToPlayers = (G: IGameState) => {
  for (const id in G.players) {
    const player = G.players[id];

    const card = G.deck.pop();
    if (card) {
      player.hand.push(card);
    }
  }
};

export const isRoundOver = (players: IGamePlayer[]) =>
  players.every(player => player.isDead || player.hand.length === 1);
