import { ICard } from '../../../game';

export const getCardInstructions = (card: ICard) => {
  if (card.isTargeted) {
    return `Drag and drop on top of a player to play`;
  }

  return `Click to play`;
};
