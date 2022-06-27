import { API } from "../api/api"
import {
    SET_TRANSACTIONS,
    GET_TRANSACTION,
    ADD_TRANSACTION,
    DELETE_TRANSACTION,
    EDIT_TRANASACTION,
    SET_TOTAL_COUNT,
    SET_CURRENT_PAGE,
    TRANSACTIONS_LOADING,
    TRANSACTIONS_LOADED,
    MORE_TRANSACTION_LOADING,
    GET_TRANSACTIONS
} from "./action-types"
import { cardThunks } from "./card";
import { appActions } from "./app";

const initialState = {
    transactions: [],
    pageSize: 50,
    curentPage: 1,
    totalTransCount: 0,
    moreTransLoad: false
}

const transactions = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_TRANSACTIONS:
            return {
                ...state,
                transactions: payload
            }
        case ADD_TRANSACTION:
            return {
                ...state,
                transactions: [
                    ...state.transactions,
                    payload
                ]
            }
        case DELETE_TRANSACTION:
            return {
                ...state,
                transactions: state.transactions.filter(item => item.id !== payload)
            }
        case GET_TRANSACTION:
            return {
                ...state,
                transaction: payload,
            }
        case SET_TOTAL_COUNT:
            return {
                ...state,
                totalTransCount: payload
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                curentPage: payload
            }
        case TRANSACTIONS_LOADING:
            return {
                ...state,
                isLoading: true
            }
        case TRANSACTIONS_LOADED:
            return {
                ...state,
                isLoading: false
            }
        case MORE_TRANSACTION_LOADING:
            return {
                ...state,
                moreTransLoad: payload
            }
        default:
            return state
    }
}

export const actions = {
    addTransaction: value => {
        return {
            type: ADD_TRANSACTION,
            payload: value
        }
    },
    editTransaction: transaction => {
        return {
            type: EDIT_TRANASACTION
        }
    },
    deleteTransaction: id => {
        return {
            type: DELETE_TRANSACTION,
            payload: id
        }
    },
    getTransaction: transaction => {
        return {
            type: GET_TRANSACTION,
            payload: transaction
        }
    },
    startLoadTarns: data => {
        return {
            type: TRANSACTIONS_LOADING,
            payload: data
        }
    },
    setCurrentPage: page => {
        return {
            type: SET_CURRENT_PAGE,
            payload: page
        }
    },
    setTotalCount: count => {
        return {
            type: SET_TOTAL_COUNT,
            payload: count
        }
    },
    endLoadTrans: data => {
        return {
            type: TRANSACTIONS_LOADED,
            payload: data
        }
    },
    transLoadingProgres: data => {
        return {
            type: MORE_TRANSACTION_LOADING,
            payload: data
        }
    },
    setTransactions: transactions => {
        return {
            type: SET_TRANSACTIONS,
            payload: transactions
        }
    },
    getTransactions: transactions => {
        return {
            type: GET_TRANSACTIONS,
            payload: transactions
        }
    }

}

export const transactionsThunk = {
    getTransaction: (transaction) => dispatch => {
        dispatch(actions.getTransaction(transaction))
    },
    getTransactions: ({ login, cardid, pageSize, sort, filter, page = undefined }) => dispatch => {
        if (page === undefined) {
            dispatch(actions.startLoadTarns(true))
            API.getTransactions({ login, cardid, pageSize, filter, sort })
                .then(data => {
                    dispatch(actions.setCurrentPage(1))
                    dispatch(actions.setTransactions(data.data))
                    dispatch(actions.setTotalCount(parseInt(data.headers["x-total-count"])))
                    dispatch(actions.endLoadTrans(false))
                })
        } else {
            dispatch(actions.transLoadingProgres(true))
            dispatch(actions.setCurrentPage(page))
            API.getNextTransactions({ login, cardid, pageSize, filter, sort, page })
                .then(data => {
                    dispatch(actions.getTransactions(data.data))
                    dispatch(actions.transLoadingProgres(false))
                })
        }
    },

    addTransaction: form => async dispatch => {
        dispatch(actions.addTransaction(form))
        const res = await API.addTransaction(form)
        if (form.type === 'expense') {

            dispatch(cardThunks.subtractTransaktion(
                {
                    cardid: form.cardid,
                    cost: form.cost,
                    type: form.type
                }
            ))
        }
        if (form.type === 'income') {
            dispatch(cardThunks.addTransaktion(
                {
                    cardid: form.cardid,
                    cost: form.cost,
                    type: form.type
                }
            ))
        }
        if (res.status >= 400) {
            dispatch({
                type: "REQUEST_ERROR"
            })
        }
    },
    deleteTransaction: (id, cardid, cost, type) => async dispatch => {
        if (type === 'expense') {
            dispatch(cardThunks.addTransaktion(
                {
                    cardid: cardid,
                    cost: cost,
                    type: type
                }
            ))
        }
        if (type === 'income') {
            dispatch(cardThunks.subtractTransaktion(
                {
                    cardid: cardid,
                    cost: cost,
                    type: type
                }
            ))
            
        }
        dispatch(actions.deleteTransaction(id));
        API.deleteTransaction(id)
    },
    editTrans: form => async dispatch => {
        const res = await API.editTransaction(form)
        dispatch(appActions.showModal({
            type: res.type,
            message: res.message
        }))
        if (res.type === 'message') {
            dispatch(actions.getTransaction(res.data))
        }
    },

}

export default transactions