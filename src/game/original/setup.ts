import { Ctx } from 'boardgame.io/dist/types/src/types';
import { ISetupData } from './config';
import { CardName, ICard, IGamePlayer, IGamePlayerMap, IGameState } from './types';
const setup = (ctx: Ctx, setupData: ISetupData) => {
  const players: IGamePlayerMap = {};
  const playOrder: string[] = [];
  const deck: ICard[] = [];

  // Create players
  for (const playerId of ctx.playOrder) {
  }

  return {
    deck,
    players,
  } as IGameState;
};

export default setup;
