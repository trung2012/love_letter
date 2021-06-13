import React from 'react';
import { Droppable } from 'react-dragtastic';
import { Card } from '../Card';
import './DroppableCard.scss';
import { useErrorContext, useGameContext } from '../../../context';
import { ICard } from '../../../game';
import styled from '@emotion/styled';
import { IDraggableCardData } from '../DraggableCard/DraggableCard.types';
interface IDroppableCardProps {
  card: ICard;
  index: number;
  isFacedUp: boolean;
  playerId: string;
  onClick?: () => void;
}

export type CardContainerProps = {
  index: number;
  isCurrentPlayer: boolean;
};

export const DroppableCardContainer = styled.div<{ isCurrentPlayer: boolean }>`
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  &:hover {
    transform: ${props => `${props.isCurrentPlayer ? 'translateY(-3rem)' : 'translateY(2rem)'} `};
    z-index: 11;
  }
`;

export const DroppableCardComponent: React.FC<IDroppableCardProps> = ({
  card,
  index,
  isFacedUp,
  playerId,
  onClick,
}) => {
  const { G, ctx, moves, playerID } = useGameContext();
  const { setError, setNotification } = useErrorContext();
  const { players } = G;

  const onDrop = (data: IDraggableCardData) => {
    const { sourceCard, sourceCardIndex, sourcePlayerId, sourceCardLocation } = data;
    const sourcePlayer = players[sourcePlayerId];
    const targetPlayer = players[playerId];
  };

  return (
    <Droppable accepts='card' onDrop={onDrop}>
      {droppableDragState => (
        <DroppableCardContainer
          isCurrentPlayer={playerID === playerId}
          className='droppable-card'
          {...droppableDragState.events}
        >
          <Card card={card} isFacedUp={isFacedUp} onClick={onClick} />
        </DroppableCardContainer>
      )}
    </Droppable>
  );
};

export const DroppableCard = React.memo(DroppableCardComponent);
