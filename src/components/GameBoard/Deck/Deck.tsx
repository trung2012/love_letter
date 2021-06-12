import React, { useState } from 'react';
import { useErrorContext, useGameContext } from '../../../context';
import { animationDelayMilliseconds, ICard } from '../../../game';
import { CardPile } from './CardPile';
import classnames from 'classnames';
import './Deck.scss';
import Tippy from '@tippyjs/react';

interface IDeckProps {
  deck: ICard[];
}

export const Deck: React.FC<IDeckProps> = ({ deck }) => {
  const [isDeckDisabled, setIsDeckDisabled] = useState(false);
  const { ctx, isActive, playerID, moves } = useGameContext();
  const { setError } = useErrorContext();

  const onDeckClick = () => {
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
    <Tippy content='Click to draw'>
      <div>
        <CardPile
          className={classnames('deck', {
            'deck--active': isActive && playerID === ctx.currentPlayer,
          })}
          cards={deck}
          isFacedUp={false}
          onClick={isDeckDisabled ? () => {} : onDeckClick}
        />
      </div>
    </Tippy>
  );
};
