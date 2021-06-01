import { INVALID_MOVE } from 'boardgame.io/core';
import { ActivePlayersArg, Ctx } from 'boardgame.io';
import { CardName, ICard, ICardToDiscard, IGameState } from './types';

import { SelectedCards } from '../../context';

export const endturn = (G: IGameState, ctx: Ctx) => {
  endTurn(G, ctx);
};

export const endTurn = (G: IGameState, ctx: Ctx) => {
  const currentPlayer = G.players[ctx.currentPlayer];
};

export const endStage = (G: IGameState, ctx: Ctx) => {
  if (ctx.events?.endStage) {
    ctx.events.endStage();
  }
};

export const playCard = (G: IGameState, ctx: Ctx, cardIndex: number, targetPlayerId: string) => {
  ctx.effects.swoosh();
  const targetPlayer = G.players[targetPlayerId];
  const currentPlayer = G.players[ctx.currentPlayer];
  let cardToPlay = currentPlayer.hand.splice(cardIndex, 1)[0];

  targetPlayer.cardsInPlay.push(cardToPlay);
};

export const clearCardsInPlay = (G: IGameState, ctx: Ctx, targetPlayerId: string) => {
  const targetPlayer = G.players[targetPlayerId];

  while (targetPlayer.cardsInPlay.length > 0) {
    const discardedCard = targetPlayer.cardsInPlay.shift();
    if (discardedCard) {
      ctx.effects.swoosh();
    }
  }
};

const drawFromDeck = (G: IGameState, ctx: Ctx, numberOfCards: number) => {
  const currentPlayer = G.players[ctx.currentPlayer];
  const newCards: ICard[] = G.deck.slice(G.deck.length - numberOfCards, G.deck.length);
  G.deck = G.deck.slice(0, G.deck.length - numberOfCards);
  currentPlayer.hand.push(...newCards);
};

export const moves = {
  drawFromDeck,
  playCard,
  endTurn,
  endturn,
  endStage,
};

export default moves;
