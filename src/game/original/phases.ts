import { PhaseConfig } from 'boardgame.io';

interface IGamePhases {
  [phaseName: string]: PhaseConfig;
}

const phases: IGamePhases = {
  // main: {
  //   start: true,
  //   next: mainNextPhase,
  //   endIf: (G: IGameState, ctx: Ctx) => G.phases[G.currentPhaseIndex] === mainNextPhase,
  //   turn: {
  //     order: {
  //       ...TurnOrder.DEFAULT,
  //       first: (G: IGameState, ctx: Ctx) => {
  //         const allPlayerIds = Object.keys(G.players);
  //         const randomPlayerId = allPlayerIds[Math.floor(Math.random() * allPlayerIds.length)];
  //         return Number(G.prevWinnerIds[0] ?? randomPlayerId);
  //       },
  //     },
  //   },
  //   onBegin: (G: IGameState, ctx: Ctx) => {
  //     resetRound(G, ctx);
  //   },
  // },
};

export default phases;
