import { useEffectListener } from 'bgio-effects/react';
import useSound from 'use-sound';
import { BangEffectsConfig } from '../game';
const grunt = require('../assets/sounds/hit.mp3');

export const useBgioEffects = () => {
  const [playGrunt] = useSound(grunt, { volume: 0.6 });

  useEffectListener<BangEffectsConfig>(
    'takeDamage',
    () => {
      playGrunt();
    },
    [playGrunt]
  );
};
