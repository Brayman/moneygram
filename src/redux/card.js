import {
    ADD_TRANSACTION,
    GET_TRANSACTIONS,
    GET_TRANSACTION,
    SET_TRANSACTIONS,
    SET_CURRENT_PAGE,
    SET_TOTAL_COUNT,
    MORE_TRANSACTION_LOADING,
    TRANSACTIONS_LOADING,
    TRANSACTIONS_LOADED,
    SET_CARDS,
    CREATE_CARD,
    SET_NEXT_CARD,
    SET_PERV_CARD,
    DELETE_TRANSACTION,
} from "./action-types";

const defaultState = {
    isLoading: false,

    transactions: [],
    pageSize: 50,
    curentPage: 1,
    totalTransCount: 0,
    moreTransLoad: false,

    transaction: undefined,
    cards: [],
    selectCard: 0,

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
        case SET_NEXT_CARD:
            return {
                ...state,
                selectCard: state.selectCard + 1,
                card: state.cards[state.selectCard]
            }
        case SET_PERV_CARD:
            return {
                ...state,
                selectCard: --state.selectCard,
            }
        case ADD_TRANSACTION:
            return {
                ...state,
                transactions: [
                    ...state.transactions,
                    payload
                ],
                card: {
                    ...state.card,
                    balance: 1
                }
            }
        case DELETE_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.filter(item => {
                    if (item.id !== payload) return item
                })
            }
        case GET_TRANSACTION:
            return {
                ...state,
                transaction: payload,
            }
        case GET_TRANSACTIONS:
            return {
                ...state,
                transactions: [
                    ...state.transactions,
                    ...payload
                ],
            }
        case SET_TRANSACTIONS:
            return {
                ...state,
                transactions: payload
            }
        case SET_TOTAL_COUNT: return { ...state, totalTransCount: payload }
        case SET_CURRENT_PAGE: return { ...state, curentPage: payload }
        case TRANSACTIONS_LOADING: return { ...state, isLoading: true }
        case TRANSACTIONS_LOADED: return { ...state, isLoading: false }
        case MORE_TRANSACTION_LOADING:
            return {
                ...state,
                moreTransLoad: payload
            }
        default: return state;
    }
}

export const load = value => { return { type: ADD_TRANSACTION, payload: value } }
export default card;
