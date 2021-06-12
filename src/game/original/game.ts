import { Game } from 'boardgame.io';
import { TurnOrder } from 'boardgame.io/core';
import { EffectsPlugin } from 'bgio-effects/plugin';
import moves, { drawOneFromDeck } from './moves';
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
        return Number(randomPlayerId);
      },
      next: (G, ctx) => {
        let nextPlayerPos = ctx.playOrderPos % ctx.playOrder.length;
        do {
          nextPlayerPos = (nextPlayerPos + 1) % ctx.playOrder.length;
        } while (G.players[nextPlayerPos.toString()].isDead);
        return nextPlayerPos;
      },
    },
    stages,
    onBegin: (G, ctx) => {
      const currentPlayer = G.players[ctx.currentPlayer];
      if (G.deck.length > 0) {
        const newCard = G.deck.pop();
        if (newCard) {
          currentPlayer.hand.push(newCard);
        }
      }
    },
  },
};

export default game;
