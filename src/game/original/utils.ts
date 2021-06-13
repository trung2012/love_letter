import { Ctx } from 'boardgame.io';
import { ICard, IGamePlayer, IGamePlayerMap, IGameState } from './types';

export const shuffle = (ctx: Ctx, array: any[]) => {
  return (array = ctx.random?.Shuffle ? ctx.random.Shuffle(array) : array);
};

export const getNumPointsToWin = (numPlayers: number) => {
  if (numPlayers <= 2) return 6;
  if (numPlayers <= 4) return 4;
  if (numPlayers <= 6) return 3;
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

export const getLastCardPlayed = (player: IGamePlayer) => {
  return player.cardsInPlay[player.cardsInPlay.length - 1];
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

export const isRoundOverWithNoWinner = (G: IGameState, players: IGamePlayer[]) =>
  !G.deck.length && players.every(player => player.isDead || player.hand.length === 1);

export const needsToDraw = (player: IGamePlayer) => player.cardDrawnAtStartLeft > 0;

export const shouldNoFilterBePlayed = (hand: ICard[]) =>
  hand.find(card => card.name === 'no filter') &&
  (hand.find(card => card.name === 'the ghost') || hand.find(card => card.name === 'puppy love'));

export const getRoundResult = (G: IGameState, ctx: Ctx) => {
  const players = ctx.playOrder.map(id => G.players[id]);
  const playersAlive = players.filter(player => !player.isDead);
  const isRoundOverWithoutWinner = isRoundOverWithNoWinner(G, players);
  if (!isRoundOverWithoutWinner) return [];

  let maxVal = -1;
  let winners: IGamePlayer[] = [];
  for (const player of playersAlive) {
    const playerHandValue = player.cardsInPlay[player.cardsInPlay.length - 1].value;
    if (playerHandValue >= maxVal) {
      winners.push(player);
      maxVal = playerHandValue;
    }
  }
  return winners;
};

export const getPlayersAlive = (G: IGameState, ctx: Ctx) => {
  const players = ctx.playOrder.map(id => G.players[id]);
  return players.filter(player => !player.isDead);
};

export const isEveryoneElseProtected = (G: IGameState, ctx: Ctx) => {
  const playersAlive = getPlayersAlive(G, ctx);
  const otherPlayersAlive = playersAlive.filter(player => player.id !== ctx.currentPlayer);
  return otherPlayersAlive.every(player => getLastCardPlayed(player).name === 'old photo');
};
