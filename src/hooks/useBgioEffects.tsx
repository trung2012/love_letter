import { useEffectListener } from 'bgio-effects/react';
import useSound from 'use-sound';
import { BangEffectsConfig } from '../game';
const grunt = require('../assets/sounds/hit.mp3');
const swoosh = require('../assets/sounds/swoosh.mp3');

export const useBgioEffects = () => {
  const [playGrunt] = useSound(grunt, { volume: 0.6 });
  const [playSwoosh] = useSound(swoosh, { volume: 0.25 });

  useEffectListener<BangEffectsConfig>(
    'takeDamage',
    () => {
      playGrunt();
    },
    [playGrunt]
  );

  useEffectListener<BangEffectsConfig>(
    'swoosh',
    () => {
      playSwoosh();
    },
    [playSwoosh]
  );
};
