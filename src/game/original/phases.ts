import { PhaseConfig } from 'boardgame.io';

interface IGamePhases {
  [phaseName: string]: PhaseConfig;
}

const phases: IGamePhases = {};

export default phases;
