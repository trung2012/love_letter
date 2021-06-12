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
    imageUrl:
      'https://res.cloudinary.com/trungpham/image/upload/v1622517553/love%20letter/catfish_fm8eom.jpg',
    value: 0,
    count: 2,
    isTargeted: false,
  },
  {
    name: 'group photo',
    imageUrl:
      'https://res.cloudinary.com/trungpham/image/upload/v1622517553/love%20letter/group_photo_1_vzdnai.jpg',
    value: 1,
    count: 6,
    isTargeted: true,
  },
  {
    name: 'fish guy',
    imageUrl:
      'https://res.cloudinary.com/trungpham/image/upload/v1622517553/love%20letter/fish_guy_gbunnm.jpg',
    value: 2,
    count: 2,
    isTargeted: true,
  },
  {
    name: 'devils advocate',
    imageUrl:
      'https://res.cloudinary.com/trungpham/image/upload/v1622517553/love%20letter/devils_advocate_jdqejm.jpg',
    value: 3,
    count: 2,
    isTargeted: true,
  },
  {
    name: 'old photo',
    imageUrl:
      'https://res.cloudinary.com/trungpham/image/upload/v1622517552/love%20letter/old_photo_sdsi06.jpg',
    value: 4,
    count: 2,
    isTargeted: false,
  },
  {
    name: 'the ghost',
    imageUrl:
      'https://res.cloudinary.com/trungpham/image/upload/v1622517553/love%20letter/ghost_gnch4f.jpg',
    value: 5,
    count: 2,
    isTargeted: true,
  },
  {
    name: 'the intellectual',
    imageUrl:
      'https://res.cloudinary.com/trungpham/image/upload/v1622517552/love%20letter/intellectual_gtoweo.jpg',
    value: 6,
    count: 2,
    isTargeted: false,
  },
  {
    name: 'puppy love',
    imageUrl:
      'https://res.cloudinary.com/trungpham/image/upload/v1622517553/love%20letter/puppy_love_jzfri8.jpg',
    value: 7,
    count: 1,
    isTargeted: true,
  },
  {
    name: 'no filter',
    imageUrl:
      'https://res.cloudinary.com/trungpham/image/upload/v1622517552/love%20letter/no_filter_p5cafq.jpg',
    value: 8,
    count: 1,
    isTargeted: false,
  },
  {
    name: 'perfect match',
    imageUrl:
      'https://res.cloudinary.com/trungpham/image/upload/v1622517552/love%20letter/perfect_match_ueh1ur.jpg',
    value: 9,
    count: 1,
    isTargeted: false,
  },
];

const generateCards = (cardsToGenerate: ICardsToGenerate, type: string) => {
  fs.appendFileSync(
    `./cards${type ? `_${type}` : ''}.ts`,
    `export const cards${type ? `_${type}` : ''}: ICard[] = `
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
