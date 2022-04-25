import { API } from "../api/api";
import {
    CREATE_TRANASACTION,
    ADD_TRANSACTION,
    GET_TRANSACTIONS,
    SET_TRANSACTIONS,
    SET_CURRENT_PAGE,
    SET_TOTAL_COUNT,
    MORE_TRANSACTION_LOADING,
    TRANSACTIONS_LOADING,
    TRANSACTIONS_LOADED
} from "./action-types";

const defaultState = {
    transactions : [],
    newTrans: {
        receiver: '',
        cost: ''
    },
    isLoading: false,
    moreTransLoad: false,
    pageSize: 10,
    totalTransCount: 0,
    curentPage: 1
}
const transactions = (state = defaultState, {type, payload}) => {
    switch (type) {
        case CREATE_TRANASACTION:
            return {
                ...state,
                newTrans: {
                    ...state.newTrans,
                    [payload.item]: payload.value
                }
            }
        case ADD_TRANSACTION:
            return {
                ...state,
                transactions: [
                    ...state.transactions,
                    {
                        ...state.newTrans,
                        id: new Date().getTime(),
                        date: new Date().getTime(),
                        userid: payload.userid
                    }
                ],
                newTrans: {
                    receiver: '',
                    cost: ''
                }
            }
        case GET_TRANSACTIONS: return { ...state, transactions: [...state.transactions, ...payload], }
        case SET_TRANSACTIONS: return { ...state, transactions: payload }
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
export const createChangeAction = (item) => {
    return {
        type: CREATE_TRANASACTION,
        payload: {
            item: item.id,
            value: item.value
        }
    }
}
export const AddTransactionAction = (userid, value) => {
    return {
        type: ADD_TRANSACTION,
        payload: {...value, userid}
    }
}
export const load = value => { return { type: ADD_TRANSACTION, payload: value } }
export const setTransactionsAC = data => {
    return {
        type: SET_TRANSACTIONS,
        payload: data
    }
}
export const getTransactionsAC = data => { return { type: GET_TRANSACTIONS, payload: data } }
export const setCurrentPageAC = page => { return { type: SET_CURRENT_PAGE, payload: page } }
export const transLoadingStartAction = data => { return { type: TRANSACTIONS_LOADING, payload: data } }
export const transLoadingEndAction = data => {
    return {
        type: TRANSACTIONS_LOADED,
        payload: data
    }
}
export const setTotalCountAC = count => { return { type: SET_TOTAL_COUNT, payload: count } }

export const transLoadingProgresAC = data => {
    return {
        type: MORE_TRANSACTION_LOADING,
        payload: data
    }
}

export const getTransactionsThunk = (login, pageSize, page) => dispatch => {
    if (page === undefined) {
        dispatch(transLoadingStartAction(true))
        API.getTransactions(login, pageSize)
        .then(data => {
            dispatch(setCurrentPageAC(1))
            dispatch(setTransactionsAC(data.data))
            dispatch(setTotalCountAC(parseInt(data.headers["x-total-count"])))
            dispatch(transLoadingEndAction(false))
        })
    } else {
        dispatch(transLoadingProgresAC(true))
        dispatch(setCurrentPageAC(page))
        API.getNextTransactions(login, pageSize, page)
        .then(data => {
            dispatch(getTransactionsAC(data.data))
            dispatch(transLoadingProgresAC(false))
        }) }}



export default transactions;
