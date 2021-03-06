import gsap, { Back } from 'gsap';
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { useGameContext } from '../../../context';
import { IGameResult } from '../../../game';
import { CustomButton } from '../../shared';
import './GameOver.scss';
import { lobbyService } from '../../../api';
import { useSelector } from 'react-redux';
import { selectPlayerCredentials, selectPlayerId } from '../../../store';
import { getPreviousGamePlayersMap } from '../../../utils';
interface IGameOverProps {
  gameResult: IGameResult;
}

export const GameOver: React.FC<IGameOverProps> = ({ gameResult }) => {
  const history = useHistory();
  const { roomId } = useParams<{ roomId: string }>();
  const clientPlayerId = useSelector(selectPlayerId);
  const clientPlayerCredentials = useSelector(selectPlayerCredentials);
  const { playersInfo = [] } = useGameContext();
  const winners = gameResult.winners.map(player => ({
    ...player,
    name: playersInfo[Number(player.id)].name,
  }));

  useEffect(() => {
    gsap.from('.game-result-winner', {
      duration: 0.75,
      x: -2000,
      ease: Back.easeOut,
      stagger: {
        from: 'start',
        axis: 'x',
        amount: 0.5,
      },
    });
  }, []);

  const onPlayAgainClick = async () => {
    if (!roomId || clientPlayerId === null) {
      throw Error('No previous room!');
    }

    const previousGamePlayers = getPreviousGamePlayersMap(playersInfo);

    const nextMatchID = await lobbyService.playAgain(
      roomId,
      clientPlayerId,
      clientPlayerCredentials,
      {
        previousGamePlayers,
      }
    );
    history.push(`/rooms/${nextMatchID}`);
  };

  return (
    <div className='game-result'>
      <div className='game-result-winners'>
        {winners.map(player => (
          <div className='game-result-winner' key={player.id}>
            {player.name && <span>{player.name} Won!</span>}
          </div>
        ))}
      </div>
      <div className='game-result-buttons'>
        <CustomButton text='Play Again' onClick={onPlayAgainClick} />
      </div>
    </div>
  );
};
