export const delayBetweenActions = 2000;
export const animationDelayMilliseconds = 900;
export const animationDelaySeconds = animationDelayMilliseconds / 1000;

export const numPlayers = [2, 3, 4, 5, 6];

export enum stageNames {
  intellectual = 'intellectual',
}

export const cardValueToNameMap: Record<number, string> = {
  0: 'Catfish',
  1: 'Group Photo',
  2: 'Fish Guy',
  3: `Devil's Advocate`,
  4: `Old Photo`,
  5: 'The Ghost',
  6: 'The Intellectual',
  7: 'Puppy Love',
  8: '#No Filter',
  9: 'Perfect Match',
};
