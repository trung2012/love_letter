import React, { useEffect, useRef } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { useErrorContext, useGameContext } from '../../../context';
import { Deck } from '../Deck';
import { GameOver } from '../GameOver';
import { Player } from '../Player';
import { useBgioEffects } from '../../../hooks';
import Modal from '../../shared/Modal';
import './GameTable.scss';
import 'react-toastify/dist/ReactToastify.min.css';
import { CustomButton } from '../../shared';
import { useModalContext } from '../../../context/modal';

export const GameTable = () => {
  const { G, ctx, moves, playersInfo, playerID } = useGameContext();
  const { error, setError, notification, setNotification } = useErrorContext();
  const { modalContent, setModalContent } = useModalContext();
  const { players, deck, spare } = G;

  const clientPlayerIndex = playersInfo?.findIndex(p => playerID === p.id.toString());
  const renderedPlayers =
    playersInfo && clientPlayerIndex && clientPlayerIndex !== -1
      ? [
          playersInfo[clientPlayerIndex],
          ...playersInfo?.slice(clientPlayerIndex + 1),
          ...playersInfo?.slice(0, clientPlayerIndex),
        ]
      : playersInfo;

  const currentPlayerNameRef = useRef<string | null>(null);
  const currentPlayerName = playersInfo ? playersInfo[Number(ctx.currentPlayer)]?.name : null;

  useBgioEffects();

  useEffect(() => {
    if (currentPlayerName) {
      if (currentPlayerName && !currentPlayerNameRef.current) {
        currentPlayerNameRef.current = currentPlayerName;
      }

      toast.info(`${currentPlayerName}'s turn`, {
        autoClose: 3000,
      });
    }
  }, [currentPlayerName]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        onClose: () => {
          setError('');
        },
      });
    }
  }, [error, setError]);

  useEffect(() => {
    if (notification) {
      toast.info(notification, {
        onClose: () => {
          setNotification('');
        },
      });
    }
  }, [notification, setNotification]);

  if (ctx.gameover) {
    return <GameOver gameResult={ctx.gameover} />;
  }

  if (playersInfo && playersInfo.length > 0) {
    return (
      <div className={`game-table game-table--${playersInfo.length}-players`}>
        {renderedPlayers &&
          renderedPlayers.map((p, index) => {
            const player = { ...players[p.id], name: players[p.id].name || p.name };

            return player && <Player key={player.id} player={player} playerIndex={index} />;
          })}
        <div className='common-cards'>
          <Deck deck={deck} />
          <Deck deck={spare} />
        </div>
        <ToastContainer
          position='top-center'
          autoClose={4500}
          hideProgressBar
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        {modalContent && (
          <Modal title={modalContent.title}>
            <span>{modalContent.text}</span>
            {modalContent.buttons && (
              <div className='modal-buttons'>
                {modalContent.buttons.map(button => {
                  const { text, moveName, moveArgs } = button;
                  return (
                    <CustomButton
                      key={button.text}
                      text={text}
                      onClick={() => {
                        setModalContent(null);
                        if (moveName && moves[moveName]) {
                          if (moveArgs) {
                            moves[moveName](...moveArgs);
                            return;
                          }

                          moves[moveName]();
                        }
                      }}
                    />
                  );
                })}
              </div>
            )}
          </Modal>
        )}
      </div>
    );
  }

  return <h1>Something went wrong</h1>;
};
