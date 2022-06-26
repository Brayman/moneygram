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
    cards: [],
    cardForSave: undefined

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
                            balance: ((card.balance * 100) + (payload.cost * 100)) / 100
                        }
                    }
                    return card
                }),
                cardForSave: payload.cardid
            }
        case CARD_SUBTRACT_TRANSACTION:
            return {
                ...state,
                cards: state.cards.map((card) => {
                    if (card.id === payload.cardid) {
                        return {
                            ...card,
                            balance: ((card.balance * 100) - (payload.cost * 100)) / 100
                        }
                    }
                    return card
                }),
                cardForSave: payload.cardid
            }
        case UPDATE_CARD:
            return {
                ...state,
                cards: state.cards.map(card => card.id === payload.id ? payload : card)
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
    saveCard: () => {
        return {
            type: SAVE_CARD
        }
    }
}
export const cardThunks = {
    addTransaktion: transaction => async dispatch => {
        dispatch(actions.addTransaktion(transaction))
    },
    subtractTransaktion: transaction => async dispatch => {
        dispatch(actions.subtractTransaktion(transaction))
    },
    updateCardBalance: data => async dispatch => {
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
