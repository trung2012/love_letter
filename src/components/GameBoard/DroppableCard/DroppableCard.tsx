import React from 'react';
import { Droppable } from 'react-dragtastic';
import { Card } from '../Card';
import './DroppableCard.scss';
import { useGameContext } from '../../../context';
import { ICard } from '../../../game';
import styled from '@emotion/styled';
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

export const DroppableCardComponent: React.FC<IDroppableCardProps> = ({
  card,
  isFacedUp,
  playerId,
  onClick,
}) => {
  const { playerID } = useGameContext();

  return (
    <Droppable accepts='card'>
      {droppableDragState => (
        <div className='droppable-card' {...droppableDragState.events}>
          <Card card={card} isFacedUp={isFacedUp} onClick={onClick} />
        </div>
      )}
    </Droppable>
  );
};

export const DroppableCard = React.memo(DroppableCardComponent);
