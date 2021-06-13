export interface IGameState {
  deck: ICard[];
  spare: ICard[];
  players: IGamePlayerMap;
  pointsToWin: number;
  prevWinnerIds: string[];
  fishGuyState?: {
    targetPlayerId: string;
  };
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
}

export const mainPhase = 'main';
export const mainNextPhase = 'mainNext';
