import { capitalize } from './capitalize';

export const toCamelCase = (string: string) => {
  if (!string?.length) return '';
  const wordArray = string.split(' ');

  if (!wordArray.length) return string;

  return wordArray
    .map((word, index) => {
      if (index === 0) return word;
      return capitalize(word);
    })
    .join('');
};
