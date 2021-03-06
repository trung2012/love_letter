import React from 'react';
import classnames from 'classnames';
import { ICard } from '../../../game';

interface ICardFrontProps {
  card: ICard;
  style?: React.CSSProperties | undefined;
  className?: string;
  onContextMenu?: (event: React.MouseEvent<HTMLDivElement>) => void;
  onClick?: () => void;
  disabled?: boolean;
}

export const CardFront = React.forwardRef<HTMLDivElement, ICardFrontProps>(
  ({ card, className, disabled, style, onContextMenu, onClick }, cardRef) => {
    return (
      <div
        id={card.id}
        className={classnames('card', className && className, {
          'card-disabled': disabled,
        })}
        style={style}
        title={card.description ?? ''}
        onContextMenu={onContextMenu}
        onClick={onClick}
        ref={node => {
          if (typeof cardRef === 'function') {
            cardRef(node);
          } else if (cardRef) {
            cardRef.current = node;
          }
        }}
      >
        <img className='card-image' src={card.imageUrl} alt='card' />
      </div>
    );
  }
);
