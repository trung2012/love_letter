import React, { Dispatch, Fragment, SetStateAction, useState } from 'react';
import classnames from 'classnames';
import { Draggable, DragComponent } from 'react-dragtastic';
import { useCardsContext, useErrorContext, useGameContext } from '../../../context';
import {
  cardsWhichMustBePlayedOnSelf,
  delayBetweenActions,
  ICard,
  isEveryoneElseProtected,
  needsToDraw,
  shouldNoFilterBePlayed,
} from '../../../game';
import { Card } from '../Card';
import './DraggableCard.scss';
import { DraggableCardContainer, DragComponentContainer } from './DraggableCard.styles';
import Tippy from '@tippyjs/react';
import { getCardInstructions } from './DraggableCard.utils';
import { toCamelCase } from '../../../utils';

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

  const onCardClickToPlay = () => {
    if (!isActive) {
      setError(`It's not your turn`);
      return;
    }

    if (isEveryoneElseProtected(G, ctx) && !cardsWhichMustBePlayedOnSelf.includes(card.name)) {
      moves.playCard(index, playerID);
      return;
    }

    if (card.isTargeted) return;

    if (shouldNoFilterBePlayed(clientPlayer.hand) && card.name !== 'no filter') {
      setError(`You must play #No Filter`);
      return;
    }

    const moveName = toCamelCase(card.name);
    console.log(moveName);
    if (!moves[moveName]) {
      throw Error('Move does not exist');
    }

    if (needsToDraw(clientPlayer)) {
      setError(`Please draw first`);
      return;
    }

    moves.playCard(index, playerID);

    setTimeout(() => {
      moves[moveName]();
    }, delayBetweenActions);

    return;
  };

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
          <Tippy delay={[500, 0]} content={getCardInstructions(card)}>
            <DraggableCardContainer
              className='draggable-card'
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
