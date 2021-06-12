import { Ctx } from 'boardgame.io/dist/types/src/types';
import { ISetupData } from './config';
import { ICard, IGamePlayerMap, IGameState } from './types';
import { getNumPointsToWin } from './utils';
const setup = (ctx: Ctx, setupData: ISetupData) => {
  const players: IGamePlayerMap = {};
  const deck: ICard[] = [];
  const spare: ICard[] = [];
  const pointsToWin = getNumPointsToWin(ctx.playOrder.length);

  // Create players
  for (const playerId of ctx.playOrder) {
    const player = {
      id: playerId,
      name: setupData?.previousGamePlayers ? setupData.previousGamePlayers[playerId] : undefined,
      hand: [],
      cardsInPlay: [],
      secretCards: [],
      isDead: false,
      isProtected: false,
      score: 0,
    };

    players[playerId] = player;
  }

  return {
    deck,
    players,
    spare,
    pointsToWin,
  } as IGameState;
};

export default setup;
