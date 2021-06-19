import React, { useState } from 'react';
import { useErrorContext, useGameContext } from '../../../context';
import { animationDelayMilliseconds, ICard } from '../../../game';
import { CardPile } from './CardPile';
import classnames from 'classnames';
import './Deck.scss';

interface IDeckProps {
  deck: ICard[];
}

export const Deck: React.FC<IDeckProps> = ({ deck }) => {
  const [isDeckDisabled, setIsDeckDisabled] = useState(false);
  const { G, ctx, isActive, playerID, moves } = useGameContext();
  const { setError } = useErrorContext();

  const onDeckClick = () => {
    const player = G.players[playerID!];

    if (player.cardDrawnAtStartLeft <= 0) return;
    if (!isActive) {
      setError(`It's not your turn yet`);
      return;
    }

    setIsDeckDisabled(true);
    setTimeout(() => {
      setIsDeckDisabled(false);
    }, animationDelayMilliseconds);

    moves.drawOneFromDeck();
  };

  return (
    <div>
      <div>{deck.length || 0}</div>
      <CardPile
        className={classnames('deck', {
          'deck--active': isActive && playerID === ctx.currentPlayer,
        })}
        cards={deck}
        isFacedUp={false}
        onClick={isDeckDisabled ? () => {} : onDeckClick}
      />
    </div>
  );
};
