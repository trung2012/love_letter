import { StageMap } from 'boardgame.io/dist/types/src/types';
import { stageNames } from './constants';
import moves from './moves';
import { IGameState } from './types';

const stages: StageMap<IGameState> = {
  [stageNames.intellectual]: {
    moves: {
      putCardToBottomOfDeck: moves.putCardToBottomOfDeck,
    },
  },
  [stageNames.fishGuy]: {
    moves: {
      returnCard: moves.returnCard,
    },
  },
};

export default stages;
