import React from 'react';
import classnames from 'classnames';
import { useErrorContext, useGameContext } from '../../../context';
import { allCardValuesExcept1, cardValueToNameMap, IGamePlayer } from '../../../game';
import { PlayerDead } from '../PlayerDead';
import playerImg from '../../../assets/placeholder.png';
import './PlayerInfo.scss';
import { Droppable } from 'react-dragtastic';
import { IDraggableCardData } from '../DraggableCard/DraggableCard.types';
import { useModalContext } from '../../../context/modal';
interface IPlayerInfoProps {
  player: IGamePlayer;
}

export const PlayerInfo: React.FC<IPlayerInfoProps> = ({ player }) => {
  const { G, ctx, playerID, isActive, playersInfo, moves } = useGameContext();
  const { setError } = useErrorContext();
  const { setModalContent } = useModalContext();
  const isActivePlayer = player.id === ctx.currentPlayer;
  const isReactingPlayer = ctx.activePlayers && ctx.activePlayers[player.id];

  const onPlayerClick = () => {
    if (!isActive || isActivePlayer || !playerID) return;
  };

  const onDrop = (data: IDraggableCardData) => {
    if (!isActive || player.isDead) return;
    if (!playersInfo?.length) throw Error('Something went wrong');
    const { sourcePlayerId, sourceCard, sourceCardIndex } = data;

    const lastCardPlayed = player.cardsInPlay[player.cardsInPlay.length - 1];
    if (lastCardPlayed && lastCardPlayed.name === 'old photo') {
      setError(`This player is being protected. Select a different target`);
      return;
    }

    moves.playCard(sourceCardIndex, sourcePlayerId);

    switch (sourceCard.name) {
      case 'group photo': {
        setModalContent({
          title: 'Take a guess',
          text: `Choose a value to guess this player's card`,
          buttons: allCardValuesExcept1.map(value => {
            const buttonText = cardValueToNameMap[value];
            return {
              text: `${value} - ${buttonText}`,
              moveName: `groupPhoto`,
              moveArgs: [player.id, value],
            };
          }),
        });
        return;
      }
      case 'fish guy': {
        moves.fishGuy(player.id);
        return;
      }
      case 'devils advocate': {
        moves.devilsAdvocate(player.id);
        return;
      }
      case 'the ghost': {
        moves.theGhost(player.id);
        return;
      }
      case 'puppy love': {
        moves.puppyLove(player.id);
        return;
      }
    }
  };

  if (player.isDead) {
    return (
      <Droppable accepts='card' onDrop={onDrop}>
        {dragState => (
          <div onClick={onPlayerClick} {...dragState.events}>
            <PlayerDead player={player} />
          </div>
        )}
      </Droppable>
    );
  }

  return (
    <>
      <Droppable accepts='card' onDrop={onDrop}>
        {dragState => (
          <div
            className={classnames('player-info', {
              'player-info--active': isActivePlayer,
              'player-info--reacting': isReactingPlayer,
            })}
            onClick={onPlayerClick}
            {...dragState.events}
          >
            <div className='player-name'>{player.name}</div>
            <div
              className={classnames('player-character-image-container', {
                'player-character-image-container--active': isActivePlayer,
              })}
            >
              <img className='player-character-image' src={playerImg} alt='player' />
            </div>
          </div>
        )}
      </Droppable>
    </>
  );
};
