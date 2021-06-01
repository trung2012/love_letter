import React from 'react';
import { ChangeNickNameLink } from '../Lobby';
import './Header.scss';

export const Header = () => {
  return (
    <div className='game-header'>
      <h1>Love Letter</h1>
      <span
        onClick={() =>
          window.open(
            'https://res.cloudinary.com/trungpham/image/upload/v1622517554/love%20letter/love_letter_-_rules_l2crlu.pdf'
          )
        }
      >
        Game rules
      </span>
      <ChangeNickNameLink />
    </div>
  );
};
