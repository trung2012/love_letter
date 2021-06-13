import React from 'react';
import { CreateGameButton } from './CreateGameButton';
import './CreateGame.scss';
import { numPlayers } from '../../game';
import { useDispatch, useSelector } from 'react-redux';
import { createGameRoom, selectSetUpData } from '../../store';

export const CreateGame = () => {
  const dispatch = useDispatch();
  const setUpData = useSelector(selectSetUpData);

  const createGame = (numPlayers: number) => {
    dispatch(createGameRoom(numPlayers, setUpData));
  };

  return (
    <div className='create-game'>
      <h2>Create Game</h2>
      <h3>How many players?</h3>
      <div className='create-game-buttons'>
        {numPlayers.map(count => (
          <CreateGameButton key={count} numPlayers={count} onClick={() => createGame(count)} />
        ))}
      </div>
    </div>
  );
};
