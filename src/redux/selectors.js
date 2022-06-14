import { createSelector } from "reselect";

export const login = state => state.account.login;
export const selectCard = state => state.card.selectCard;
export const transactions = state => state.card.transactions;
export const pageSize = state => state.card.pageSize;
export const curentPage = state => state.card.curentPage;
export const app = state => state.app;
export const isAuth = state => state.app.isAuth;
export const isLoading = state => state.card.isLoading;
export const totalTransCount = state => state.card.totalTransCount;
export const moreTransLoad = state => state.card.moreTransLoad;
export const initialized = state => state.app.initialized;
export const account = state => state.account;
export const transaction = state => state.card.transaction;
export const cards = state => state.card.cards;
export const modal = state => state.app.modal;
export const card = createSelector(cards, selectCard, (cards, index) => {
    return cards[index]
});
// export const card = state => state.card.card;
export const cardID = createSelector(card, card => card.id);


