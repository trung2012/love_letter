import { Ctx } from 'boardgame.io/dist/types/src/types';
import { randomRotationValue } from '../../utils';
import { cards } from './cards';
import { ISetupData } from './config';
import { ICard, IGamePlayer, IGamePlayerMap, IGameState, mainNextPhase, mainPhase } from './types';
import { getNumPointsToWin } from './utils';
const setup = (ctx: Ctx, setupData: ISetupData) => {
  const players: IGamePlayerMap = {};
  const deck = (ctx.random?.Shuffle(cards) ?? cards).map(card => ({
    ...card,
    rotationValue: randomRotationValue(),
  }));
  const spare: ICard[] = [];
  const pointsToWin = getNumPointsToWin(ctx.playOrder.length);
  const phases = [mainPhase, mainNextPhase];
  const currentPhaseIndex = 0;

  // Create players
  for (const playerId of ctx.playOrder) {
    const player: IGamePlayer = {
      id: playerId,
      name: setupData?.previousGamePlayers ? setupData.previousGamePlayers[playerId] : undefined,
      hand: [],
      cardsInPlay: [],
      secretCards: [],
      isDead: false,
      score: 0,
      numMovesLeft: 1,
      cardDrawnAtStartLeft: 1,
    };

    const card = deck.pop();
    if (card) {
      player.hand.push(card);
    }

    players[playerId] = player;
  }

  const spareCard = deck.pop();

  if (spareCard) {
    spare.push(spareCard);
  }

  return {
    deck,
    players,
    spare,
    pointsToWin,
  } as IGameState;
};

export default setup;
