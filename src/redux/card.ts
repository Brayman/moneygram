import { API } from "../api/api";
import { reduxActionType } from "../types";
import {
    SET_CARDS,
    CREATE_CARD,
    UPDATE_CARD,
    CARD_ADD_TRANSACTION,
    CARD_SUBTRACT_TRANSACTION,
    SAVE_CARD
} from "./action-types";

const defaultState = {
    isLoading: false,
    cards: []

}
const card = (state = defaultState, { type, payload }: reduxActionType) => {
    switch (type) {
        case SET_CARDS:
            return {
                ...state,
                cards: payload
            }
        case CREATE_CARD:
            return {
                ...state,
                cards: [
                    ...state.cards,
                    payload
                ]
            }
        case CARD_ADD_TRANSACTION:
            return {
                ...state,
                cards: state.cards.map((card: any) => {
                    if (card.id === payload.cardid) {
                        return {
                            ...card,
                            balance: Math.trunc((card.balance + payload.cost) * 100) / 100
                        }
                    }
                    return card
                }),
                cardidForSave: payload.cardid
            }
        case CARD_SUBTRACT_TRANSACTION:
            return {
                ...state,
                cards: state.cards.map((card: any) => {
                    if (card.id === payload.cardid) {
                        return {
                            ...card,
                            balance: Math.trunc((card.balance - payload.cost) * 100) / 100
                        }
                    }
                    return card
                }),
                cardidForSave: payload.cardid
            }
        case UPDATE_CARD:
            return {
                ...state,
                cards: state.cards.map((card: any) => card.id === payload.id ? payload : card)
            }
        case SAVE_CARD:
            return {
                ...state,
                cardForSave: state.cards.find((card: any) => card.id === payload)
            }
        default: return state;
    }
}




export const actions = {
    addTransaktion: (payload: any) => {
        return {
            type: CARD_ADD_TRANSACTION,
            payload
        }
    },
    subtractTransaktion: (payload: any) => {
        return {
            type: CARD_SUBTRACT_TRANSACTION,
            payload
        }
    },
    updateCard: (card: any) => {
        return {
            type: UPDATE_CARD,
            payload: card
        }
    },
    getCardForSave: (cardid: string) => {
        return {
            type: SAVE_CARD,
            payload: cardid
        }
    },
  
}
export const cardThunks = {
    addTransaktion: (transaction: any) => async (dispatch: any) => {
        dispatch(actions.addTransaktion(transaction))
    },
    subtractTransaktion: (transaction: any) => async (dispatch: any) => {
        dispatch(actions.subtractTransaktion(transaction))
    },    
    saveCard: (card: any) => async (dispatch: any) => {
        const res = await API.saveCard(card)
        if (res.status < 400) {
            dispatch(actions.updateCard(res.data))
        } 
    }
}
export default card;
