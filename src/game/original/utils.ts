import { Ctx } from 'boardgame.io';
import { IGamePlayer } from './types';

export const shuffle = (ctx: Ctx, array: any[]) => {
  return (array = ctx.random?.Shuffle ? ctx.random.Shuffle(array) : array);
};
