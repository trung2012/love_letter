import { CardName, ICard } from '../game';

const { nanoid } = require('nanoid');
const fs = require('fs');

export type ICardsToGenerate = ICardGenerationInfo[];

export interface ICardGenerationInfo {
  name: CardName;
  imageUrl: string;
  value: number;
  description?: string;
  isTargeted?: boolean;
  count: number;
}

const cardsToGenerateOriginal: ICardsToGenerate = [
  {
    name: 'catfish',
    imageUrl: '',
    value: 0,
    count: 2,
  },
  {
    name: 'group photo',
    imageUrl: '',
    value: 1,
    count: 6,
  },
  {
    name: 'fish guy',
    imageUrl: '',
    value: 2,
    count: 2,
  },
  {
    name: 'devils advocate',
    imageUrl: '',
    value: 3,
    count: 2,
  },
  {
    name: 'old photo',
    imageUrl: '',
    value: 4,
    count: 2,
  },
  {
    name: 'the ghost',
    imageUrl: '',
    value: 5,
    count: 2,
  },
  {
    name: 'the intellectual',
    imageUrl: '',
    value: 6,
    count: 2,
  },
  {
    name: 'puppy love',
    imageUrl: '',
    value: 7,
    count: 1,
  },
  {
    name: 'no filter',
    imageUrl: '',
    value: 8,
    count: 1,
  },
  {
    name: 'perfect match',
    imageUrl: '',
    value: 9,
    count: 1,
  },
];

const generateCards = (cardsToGenerate: ICardsToGenerate, type: string) => {
  fs.appendFileSync(
    `./cards${type ? `_${type}` : ''}.ts`,
    `import { ICard } from '../original';\n
    export const cards${type ? `_${type}` : ''}: ICard[] = `
  );

  const cards: ICard[] = [];

  for (const cardInfo of cardsToGenerate) {
    const { count, ...card } = cardInfo;
    for (let i = 1; i <= count; i++) {
      const newCard = {
        ...card,
        id: nanoid(),
      };
      cards.push(newCard);
    }
  }

  fs.appendFileSync(`./cards.ts`, JSON.stringify(cards, null, 4));
};

generateCards(cardsToGenerateOriginal, '');
