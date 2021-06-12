import { Game } from 'boardgame.io';
import { TurnOrder } from 'boardgame.io/core';
import { EffectsPlugin } from 'bgio-effects/plugin';
import moves from './moves';
import phases from './phases';
import setup from './setup';
import stages from './stages';
import { IGameResult, IGameState } from './types';
import { config } from './effects';

declare module 'boardgame.io' {
  interface Ctx {
    effects: {
      [key: string]: any;
    };
  }
}

const gameName = 'LoveLetter';

const game: Game<IGameState> = {
  name: gameName,
  plugins: [EffectsPlugin(config)],
  setup,
  moves,
  phases,
  endIf: (G, ctx): IGameResult | undefined => {
    return;
  },
  turn: {
    order: {
      ...TurnOrder.DEFAULT,
      first: (G, ctx) => {
        const allPlayerIds = Object.keys(G.players);
        const randomPlayerId = allPlayerIds[Math.floor(Math.random() * allPlayerIds.length)];
        return Number(G.lastWinnerId ?? randomPlayerId);
      },
    },
    stages,
    onMove: (G, ctx) => {},
    onBegin: (G, ctx) => {
      for (const id in G.players) {
        const player = G.players[id];
        player.isProtected = false;
      }
    },
    onEnd: (G, ctx) => {},
  },
};

export default game;
