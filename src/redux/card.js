import { API } from "../api/api";
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
const card = (state = defaultState, { type, payload }) => {
    switch (type) {
        case SET_CARDS:
            return {
                ...state,
                cards: payload,
                card: payload[state.selectCard]
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
                cards: state.cards.map((card) => {
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
                cards: state.cards.map((card) => {
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
                cards: state.cards.map(card => card.id === payload.id ? payload : card)
            }
        case SAVE_CARD:
            return {
                ...state,
                cardForSave: state.cards.find(card => card.id === payload)
            }
        default: return state;
    }
}




export const actions = {
    addTransaktion: payload => {
        return {
            type: CARD_ADD_TRANSACTION,
            payload
        }
    },
    subtractTransaktion: payload => {
        return {
            type: CARD_SUBTRACT_TRANSACTION,
            payload
        }
    },
    updateCard: card => {
        return {
            type: UPDATE_CARD,
            payload: card
        }
    },
    getCardForSave: cardid => {
        return {
            type: SAVE_CARD,
            payload: cardid
        }
    },
  
}
export const cardThunks = {
    addTransaktion: transaction => async dispatch => {
        dispatch(actions.addTransaktion(transaction))
    },
    subtractTransaktion: transaction => async dispatch => {
        dispatch(actions.subtractTransaktion(transaction))
    },
    updateCardBalance: data => dispatch => {
        dispatch(actions.updateBalance(data))
    },
    
    saveCard: (card) => async dispatch => {
        const res = await API.saveCard(card)
        if (res.status < 400) {
            dispatch(actions.updateCard(res.data))
        }
        
    },
    updateCard: card => dispatch => {

        API.updateCard(card)
            .then(res => {
                dispatch(actions.updateCard(res.data))
            })
    }
}
export default card;
