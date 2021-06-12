import { keyframes } from '@emotion/core';
import styled from '@emotion/styled';
import React from 'react';
import { useErrorContext, useGameContext } from '../../../context';
import { stageNames } from '../../../game';
import { ICard } from '../../../game';
import { DraggableCard } from '../DraggableCard';
import { DroppableCard } from '../DroppableCard';
import './PlayerHand.scss';

interface IPlayerCardsProps {
  playerId: string;
  hand: ICard[];
}

export type CardContainerProps = {
  index: number;
  numCards: number;
};

const PlayerHandDroppableCardContainer = styled.div<CardContainerProps>`
  position: absolute;
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  transform: none;

  &:hover {
    transform: translateY(-15px);
  }
`;

export const PlayerHandComponent: React.FC<IPlayerCardsProps> = ({ hand, playerId }) => {
  const { G, playerID, ctx, moves } = useGameContext();
  const { setError } = useErrorContext();
  const clientPlayer = G.players[playerID!];
  const targetPlayer = G.players[playerId];
  const isPlayerDead = targetPlayer.isDead;
  const isFacedUp = playerId === playerID || !!isPlayerDead;

  return (
    <div className='player-hand'>
      {hand.map((card, index) => (
        <PlayerHandDroppableCardContainer
          index={index}
          numCards={hand.length}
          key={`${card.id}-${index}`}
        >
          <DroppableCard card={card} index={index} isFacedUp={isFacedUp} playerId={playerId} />
        </PlayerHandDroppableCardContainer>
      ))}
    </div>
  );
};

export const PlayerHand = React.memo(PlayerHandComponent);
