export interface IGameState {
  deck: ICard[];
  players: IGamePlayerMap;
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
}

export interface ICard {
  id: string;
  name: CardName;
  value: number;
  imageUrl: string;
  description?: string;
  isTargeted?: boolean;
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
