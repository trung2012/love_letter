import React, { Dispatch, Fragment, SetStateAction, useState } from 'react';
import classnames from 'classnames';
import { Draggable, DragComponent } from 'react-dragtastic';
import { useCardsContext, useErrorContext, useGameContext } from '../../../context';
import { ICard } from '../../../game';
import { Card } from '../Card';
import './DraggableCard.scss';
import { DraggableCardContainer, DragComponentContainer } from './DraggableCard.styles';
import Tippy from '@tippyjs/react';

interface IDraggableCardProps {
  card: ICard;
  index: number;
  isFacedUp: boolean;
  playerId: string;
  selectedCards?: number[];
  setSelectedCards?: Dispatch<SetStateAction<number[]>>;
}

const DraggableCardComponent: React.FC<IDraggableCardProps> = ({
  card,
  index,
  isFacedUp,
  playerId,
}) => {
  const { moves, playerID, isActive, G, ctx } = useGameContext();
  const { setError } = useErrorContext();
  const [showCardOptions, setShowCardOptions] = useState(false);
  const isClientPlayer = playerID === playerId;
  const { players } = G;
  const targetPlayer = players[playerId];
  const clientPlayer = players[playerID!];
  const isTargetPlayerTurn = playerId === playerID;

  const onCardClickToPlay = () => {};

  return (
    <Fragment>
      <Draggable
        id={`${card.id}`}
        type='card'
        data={{
          sourceCard: card,
          sourceCardIndex: index,
          sourcePlayerId: playerID,
        }}
      >
        {draggableDragState => (
          <Tippy delay={[500, 0]} content={`Drag and drop onto another player to play`}>
            <DraggableCardContainer
              {...draggableDragState.events}
              draggableDragState={draggableDragState}
              cardId={card.id}
              index={index}
              isClientPlayer={isClientPlayer}
            >
              <Card card={card} isFacedUp={isFacedUp} onClick={onCardClickToPlay} />
            </DraggableCardContainer>
          </Tippy>
        )}
      </Draggable>
      <DragComponent for={`${card.id}`}>
        {draggableDragState => (
          <DragComponentContainer className='card-dragging' draggableDragState={draggableDragState}>
            <Card card={card} isFacedUp={isFacedUp} isDragComponent={true} />
          </DragComponentContainer>
        )}
      </DragComponent>
    </Fragment>
  );
};

export const DraggableCard = React.memo(DraggableCardComponent);
