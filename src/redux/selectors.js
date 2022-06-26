import { createSelector } from "reselect";

export const login = state => state.account.login;
export const transactions = state => state.transactions.transactions;
export const pageSize = state => state.transactions.pageSize;
export const curentPage = state => state.transactions.curentPage;
export const app = state => state.app;
export const isAuth = state => state.app.isAuth;
export const isLoading = state => state.card.isLoading;
export const totalTransCount = state => state.transactions.totalTransCount;
export const moreTransLoad = state => state.transactions.moreTransLoad;
export const initialized = state => state.app.initialized;
export const account = state => state.account;
export const transaction = state => state.card.transaction;
export const cards = state => state.card.cards;
export const modal = state => state.app.modal;

// export const card = state => state.card.card;

export const sort = state => state.filter.sort;
export const filter = state => state.filter.filter;
export const cardForSave = state => state.card.cardForSave;
export const cardidForSave = state => state.card.cardidForSave;
export const card = createSelector(cards, cardForSave, (cards, cardid) => {
    return cards.find((card) => card.id === cardid)
});
export const cardID = createSelector(card, card => card.id);
