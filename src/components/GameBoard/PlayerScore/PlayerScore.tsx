import React from 'react';
import heartImg from '../../../assets/heart.png';
import { IGamePlayer } from '../../../game';
import './PlayerScore.scss';

interface IPlayerScoreProps {
  player: IGamePlayer;
}

export const PlayerScore: React.FC<IPlayerScoreProps> = ({ player }) => {
  const playerScore = Array(player.score).fill(null);

  return (
    <div className='player-score-container'>
      {playerScore.map((item, index) => (
        <div className='player-score-point'>
          <img src={heartImg} alt='point' id={`player-${player.id}-heart-${index}`} />
        </div>
      ))}
    </div>
  );
};
