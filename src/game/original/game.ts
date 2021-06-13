import { Game } from 'boardgame.io';
import { TurnOrder } from 'boardgame.io/core';
import { EffectsPlugin } from 'bgio-effects/plugin';
import moves, { drawOneFromDeck, resetRound } from './moves';
import phases from './phases';
import setup from './setup';
import stages from './stages';
import { IGamePlayer, IGameResult, IGameState } from './types';
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
    const winners: IGamePlayer[] = [];
    for (const id in G.players) {
      const player = G.players[id];
      if (player.score >= G.pointsToWin) {
        winners.push(player);
      }
    }
    if (winners.length > 0) {
      return {
        winners,
      };
    } else {
      return;
    }
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
      currentPlayer.cardDrawnAtStartLeft = 1;
      currentPlayer.numMovesLeft = 1;
      drawOneFromDeck(G, ctx);
    },
    onMove: (G, ctx) => {
      const players = ctx.playOrder.map(id => G.players[id]);
      const playersAlive = players.filter(player => !player.isDead);

      if (playersAlive.length === 1) {
        const winner = playersAlive[0];
        winner.score++;
        G.prevWinnerIds = [winner.id];
        ctx.events?.endTurn?.({ next: winner.id });

        const playersWithCatfish = players.filter(player =>
          player.cardsInPlay.find(card => card.name === 'catfish')
        );

        if (playersWithCatfish.length === 1) {
          playersWithCatfish[0].score++;
        }
        resetRound(G, ctx);
      }
    },
    onEnd: (G, ctx) => {
      const currentPlayer = G.players[ctx.currentPlayer];
      while (currentPlayer.secretCards.length > 0) {
        const card = currentPlayer.secretCards.pop();
        if (card) {
          currentPlayer.hand.push(card);
        }
      }
    },
  },
};

export default game;
