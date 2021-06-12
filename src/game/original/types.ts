export interface IGameState {
  deck: ICard[];
  spare: ICard[];
  players: IGamePlayerMap;
  pointsToWin: number;
  resetForNextRound: boolean;
  lastWinnerId: string;
  phases: string[];
  currentPhaseIndex: number;
}

export interface ICardToDiscard {
  name?: CardName;
}

export interface IGamePlayerMap {
  [id: string]: IGamePlayer;
}
export interface IGamePlayer {
  id: string;
  name?: string;
  hand: ICard[];
  cardsInPlay: ICard[];
  secretCards: ICard[];
  isDead: boolean;
  score: number;
  numMovesLeft: number;
  cardDrawnAtStartLeft: number;
}

export interface ICard {
  id: string;
  name: CardName;
  value: number;
  imageUrl: string;
  description?: string;
  isTargeted?: boolean;
  rotationValue?: number;
}

export type CardName =
  | 'catfish'
  | 'group photo'
  | 'fish guy'
  | 'devils advocate'
  | 'old photo'
  | 'the ghost'
  | 'the intellectual'
  | 'puppy love'
  | 'no filter'
  | 'perfect match';

export interface IGameResult {
  winners: IGamePlayer[];
  team: string;
}

export const mainPhase = 'main';
export const mainNextPhase = 'mainNext';
