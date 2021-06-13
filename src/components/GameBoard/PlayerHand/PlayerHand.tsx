import React from 'react';
import { useErrorContext, useGameContext } from '../../../context';
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

export const PlayerHandComponent: React.FC<IPlayerCardsProps> = ({ hand, playerId }) => {
  const { G, playerID, ctx, moves } = useGameContext();
  const { setError } = useErrorContext();
  const clientPlayer = G.players[playerID!];
  const targetPlayer = G.players[playerId];
  const isPlayerDead = targetPlayer.isDead;
  const isFacedUp = playerId === playerID || !!isPlayerDead;

  if (isFacedUp) {
    return (
      <div className='player-hand'>
        {hand.map((card, index) => (
          <DraggableCard
            key={`${card.id}-${index}-hand`}
            card={card}
            index={index}
            isFacedUp={isFacedUp}
            playerId={playerId}
          />
        ))}
      </div>
    );
  }

  return (
    <div className='player-hand'>
      {hand.map((card, index) => (
        <div key={`${card.id}-${index}`}>
          <DroppableCard card={card} index={index} isFacedUp={isFacedUp} playerId={playerId} />
        </div>
      ))}
    </div>
  );
};

export const PlayerHand = React.memo(PlayerHandComponent);
