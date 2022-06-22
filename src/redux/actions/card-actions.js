import { API } from "../../api/api"
import {
    ADD_TRANSACTION,
    GET_TRANSACTION,
    GET_TRANSACTIONS,
    MORE_TRANSACTION_LOADING,
    SET_CURRENT_PAGE,
    SET_TOTAL_COUNT,
    SET_TRANSACTIONS,
    TRANSACTIONS_LOADED,
    TRANSACTIONS_LOADING,
    UPDATE_CARD,
    DELETE_TRANSACTION
} from "../action-types"
import { appActions } from "../app"

export const actions = {
    addTransaction: value => {
        return {
            type: ADD_TRANSACTION,
            payload: value
        }
    },
    deleteTransaction: id => {
        return {
            type: DELETE_TRANSACTION,
            payload: id
        }
    },
    getTransaction: data => {
        return {
            type: GET_TRANSACTION,
            payload: data
        }
    },
    setTransactions: data => {
        return {
            type: SET_TRANSACTIONS,
            payload: data
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
    getTransactions: data => {
        return {
            type: GET_TRANSACTIONS,
            payload: data
        }
    },
    updateCard: card => {
        return {
            type: UPDATE_CARD,
            payload: card
        }
    }

}
export const cardThunks = {
    getTransaction: (transaction) => dispatch => {
        dispatch(actions.getTransaction(transaction))
    },
    getTransactions: (login, cardid, pageSize, page) => dispatch => {
        if (page === undefined) {
            dispatch(actions.startLoadTarns(true))
            API.getTransactions(login, cardid, pageSize)
                .then(data => {
                    dispatch(actions.setCurrentPage(1))
                    dispatch(actions.setTransactions(data.data))
                    dispatch(actions.setTotalCount(parseInt(data.headers["x-total-count"])))
                    dispatch(actions.endLoadTrans(false))
                })
        } else {
            dispatch(actions.transLoadingProgres(true))
            dispatch(actions.setCurrentPage(page))
            API.getNextTransactions(login, cardid, pageSize, page)
                .then(data => {
                    dispatch(actions.getTransactions(data.data))
                    dispatch(actions.transLoadingProgres(false))
                })
        }
    },
    saveTrans: form => dispatch => {
        API.addTransaction(form)
            .then(res => {
                if (res.status < 400) {
                    return res.data
                } else {
                    dispatch({
                        type: "REQUEST_ERROR"
                    })
                }
            })
            .then(data => {
                dispatch(actions.addTransaction(data))

            })
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
    updateCard: card => dispatch => {

        API.updateCard(card)
            .then(res => {
                dispatch(actions.updateCard(res.data))
            })
    }
}