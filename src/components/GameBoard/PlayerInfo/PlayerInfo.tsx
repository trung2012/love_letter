import React from 'react';
import classnames from 'classnames';
import { useGameContext } from '../../../context';
import { IGamePlayer } from '../../../game';
import { PlayerDead } from '../PlayerDead';
import playerImg from '../../../assets/placeholder.png';
import './PlayerInfo.scss';
import { Droppable } from 'react-dragtastic';
import { IDraggableCardData } from '../DraggableCard/DraggableCard.types';
import { useModalContext } from '../../../context/modal';
interface IPlayerInfoProps {
  player: IGamePlayer;
}

export const PlayerInfo: React.FC<IPlayerInfoProps> = ({ player }) => {
  const { G, ctx, playerID, isActive, playersInfo } = useGameContext();
  const isActivePlayer = player.id === ctx.currentPlayer;
  const isReactingPlayer = ctx.activePlayers && ctx.activePlayers[player.id];

  const onPlayerClick = () => {
    if (!isActive || isActivePlayer || !playerID) return;
  };

  const onDrop = (data: IDraggableCardData) => {
    if (!playersInfo?.length) throw Error('Something went wrong');
    const { sourcePlayerId, sourceCard, sourceCardIndex, sourceCardLocation } = data;
  };

  if (player.isDead) {
    return (
      <Droppable accepts='card' onDrop={onDrop}>
        {dragState => (
          <div onClick={onPlayerClick} {...dragState.events}>
            <PlayerDead player={player} />
          </div>
        )}
      </Droppable>
    );
  }

  return (
    <>
      <Droppable accepts='card' onDrop={onDrop}>
        {dragState => (
          <div
            className={classnames('player-info', {
              'player-info--active': isActivePlayer,
              'player-info--reacting': isReactingPlayer,
            })}
            onClick={onPlayerClick}
            {...dragState.events}
          >
            <div className='player-name'>{player.name}</div>
            <div
              className={classnames('player-character-image-container', {
                'player-character-image-container--active': isActivePlayer,
              })}
            >
              <img className='player-character-image' src={playerImg} alt='player' />
            </div>
          </div>
        )}
      </Droppable>
    </>
  );
};
