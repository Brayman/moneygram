import {
    CREATE_TRANASACTION,
    ADD_TRANSACTION,
    GET_TRANSACTIONS,
    SET_TRANSACTIONS,
    SET_CURRENT_PAGE
 } from "./action-types";

const defaultState = {
    transactions : [],
    newTrans: {
        receiver: '',
        cost: ''
    },
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
                transactions: [...state.transactions, {
                    ...state.newTrans,
                    id: new Date().getTime(),
                    date: new Date().getTime()
                }],
                newTrans: {
                    receiver: '',
                    cost: ''
                }
            }
        case GET_TRANSACTIONS:
            return {
                ...state,
                transactions: [...state.transactions, ...payload],
                totalTransCount: [...state.transactions, ...payload].length
            }
        case SET_TRANSACTIONS:
            return {
                ...state,
                transactions: payload,
                totalTransCount: payload.length
                }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                curentPage: payload
                } 
        default:
            return state;
    }    
}
export const createChangeAction = (item) => {
    return {
    type: CREATE_TRANASACTION,
    payload: {
        item: item.id,
        value: item.value
    }
}}
export const AddTransactionAction = value => {
    return {
        type: ADD_TRANSACTION,
        payload: value
    }
}
export const setTransactionsAC = data => {
    return {
        type: SET_TRANSACTIONS,
        payload: data
    }
}
export const getTransactionsAC = data => {
    return {
        type: GET_TRANSACTIONS,
        payload: data
    }
}
export const setCurrentPageAC = page => {
    return {
        type: SET_CURRENT_PAGE,
        payload: page
    }
}
export default transactions;