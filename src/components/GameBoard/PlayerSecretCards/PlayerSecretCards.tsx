import styled from '@emotion/styled';
import Tippy from '@tippyjs/react';
import React from 'react';
import { useGameContext } from '../../../context';
import { ICard } from '../../../game';
import { Card } from '../Card';

interface IPlayerSecretCards {
  cards: ICard[];
  playerId: string;
}

export const SecretCard = styled(Card)<{ index: number; isCurrentPlayer: boolean }>`
  position: absolute;
  left: ${props => `${props.index * 100}px`};
`;

export const PlayerSecretCards: React.FC<IPlayerSecretCards> = ({ cards, playerId }) => {
  const { G, playerID, moves, isActive } = useGameContext();

  if (!cards?.length) {
    return null;
  }

  const onSecretCardClick = (index: number) => {
    if (!isActive) return;

    if (G.fishGuyState?.targetPlayerId) {
      moves.returnCard(G.fishGuyState.targetPlayerId);
      return;
    }

    moves.putCardToBottomOfDeck(index);
  };

  return (
    <Tippy content='Click a card to put back to the deck'>
      <div className='player-cards-in-play'>
        {cards.map((card, index) => (
          <SecretCard
            key={card.id}
            card={card}
            index={index}
            isCurrentPlayer={playerId === playerID}
            isFacedUp={playerId === playerID}
            onClick={() => onSecretCardClick(index)}
          />
        ))}
      </div>
    </Tippy>
  );
};
