import React from 'react';
import { useErrorContext, useGameContext } from '../../../context';
import { PlayerButton } from './PlayerButton';
import { ReactComponent as PassIcon } from '../../../assets/pass.svg';
import { IGamePlayer } from '../../../game';
import './PlayerButtons.scss';

export const PlayerButtonsComponent: React.FC<{ player: IGamePlayer }> = ({ player }) => {
  const { ctx, moves, playerID, isActive } = useGameContext();
  const { setError } = useErrorContext();
  const isClientPlayer = playerID === player.id;
  const isCurrentPlayer = isClientPlayer && player.id === ctx.currentPlayer;

  const onEndTurnClick = () => {
    if (!isClientPlayer || !isActive) {
      setError('You cannot perform this action right now');
      return;
    }

    moves.endTurn();
  };

  if (player.isDead) {
    return null;
  }

  return (
    <div className='player-buttons'>
      {isClientPlayer && isActive && isCurrentPlayer && (
        <PlayerButton tooltipTitle='End turn' onClick={onEndTurnClick}>
          <PassIcon className='player-button-icon' />
        </PlayerButton>
      )}
    </div>
  );
};

export const PlayerButtons = React.memo(PlayerButtonsComponent);
