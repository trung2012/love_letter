import React from 'react';
import classnames from 'classnames';
import { IGamePlayer } from '../../../game';
import { ReactComponent as TombSvg } from '../../../assets/tomb.svg';
import './PlayerDead.scss';
import { useGameContext } from '../../../context';

export const PlayerDead: React.FC<{ player: IGamePlayer }> = ({ player }) => {
  const { playersInfo } = useGameContext();
  const playerName = playersInfo ? playersInfo[Number(player.id)].name : '';

  return (
    <>
      {playerName && <div className='player-dead-name'>{player.name}</div>}
      <TombSvg className='tomb' />
      <img
        className={classnames('dynamite-explosion', `dynamite-explosion-${player.id}`)}
        alt='explosion'
      />
    </>
  );
};
