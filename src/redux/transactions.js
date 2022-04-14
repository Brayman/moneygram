import {
    CREATE_TRANASACTION,
    ADD_TRANSACTION,
    GET_TRANSACTIONS
 } from "./action-types";

const defaultState = {
    transactions : [
        {
            cost: 0.49,
            tag: "bus"
        },
        {
            cost: 5.4,
            tag: "shop"
        },
        {
            cost: 6.01,
            tag: "shop"
        },
        {
            cost: 3.33+0.54,
            tag: "taxi"
        }
    ],
    newTransaktion: {
        receiver: '',
        cost: ''
    },
}

const transactions = (state = defaultState, {type, payload}) => {
    switch (type) {
        case CREATE_TRANASACTION:
            console.log(payload);
            return {
                ...state,
                newTransaktion: {
                    ...state.newTransaktion,
                    [payload.item]: payload.value
                }
            }
        case ADD_TRANSACTION:
            console.log(state);
            return {
                ...state,
                transactions: [...state.transactions, {
                    ...state.newTransaktion,
                    date: new Date().getTime()
                }],
                newTransaktion: {
                    receiver: '',
                    cost: ''
                }
            }
        case GET_TRANSACTIONS:
            return {
                ...state,
                transactions: payload
            }
        default:
            return state;
    }    
}
export const createChangeAction = (item) => {
    console.log(item);
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
export default transactions;