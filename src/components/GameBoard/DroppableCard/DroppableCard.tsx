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

export const DroppableCardContainer = styled.div<{ isCurrentPlayer: boolean }>`
  transition: transform 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  &:hover {
    transform: ${props => `${props.isCurrentPlayer ? 'translateY(-3rem)' : 'translateY(2rem)'} `};
    z-index: 11;
  }
`;

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
