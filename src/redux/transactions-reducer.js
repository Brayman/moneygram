import { createSlice } from "@reduxjs/toolkit";
import { API } from "../api/api"

import { showModal } from "./app";

const initialState = {
    isLoading: true,
    transactions: [],
    pageSize: 50,
    curentPage: 1,
    transactionsCount: 0,
    moreTransLoad: false,
    transaction: null
}

const transactionSlice = createSlice({
    name: 'transactions',
    initialState: initialState,
    reducers: {
        addTransaction: (state, { payload }) => {
            state.transactions.push(payload)
        },
        editTransaction: (state, { payload }) => {
            const index = state.transactions.findIndex(({ _id }) => _id === payload._id)
            state.transactions[index] = payload
        },
        deleteTransaction: (state, { payload }) => {
            state.transactions = state.transactions.filter(item => item.id !== payload)
        },
        getTransaction: (state, { payload }) => {
            state.transaction = payload
        },
        startLoadTarns: state => {
            state.isLoading = true
        },
        setCurrentPage: (state, { payload }) => {
            state.curentPage = payload
        },
        setTotalCount: (state, { payload }) => {
            state.transactionsCount = payload
        },
        endLoadTrans: state => {
            state.isLoading = false
        },
        transLoadingProgres: (state, { payload }) => {
            state.isLoading = payload
        },
        setTransactions: (state, { payload }) => {
            state.transactions = payload
        },
        getTransactions: (state, { payload }) => {
            state.transactions = state.transactions.concat(payload)
        }

    }
})

export const {
    getTransaction,
    startLoadTarns,
    setCurrentPage,
    setTransactions,
    setTotalCount,
    endLoadTrans,
    transLoadingProgres,
    getTransactions,
    addTransaction,
    deleteTransaction,
} = transactionSlice.actions


export const transactionsThunk = {
    getTransaction: (id) => async (dispatch) => {
        const transaction = await API.getTransaction(id)
        console.log(transaction);
        dispatch(getTransaction(transaction))
    },
    getTransactions: ({ login, cardid, pageSize, sort, filter, page = undefined }) => dispatch => {
        if (page === undefined) {
            dispatch(startLoadTarns(true))
            API.getTransactions({ login, cardid, pageSize, filter, sort })
                .then(data => {
                    dispatch(setCurrentPage(1))
                    dispatch(setTransactions(data.data))
                    dispatch(setTotalCount(parseInt(data.headers["x-total-count"])))
                    dispatch(endLoadTrans(false))
                })
        } else {
            dispatch(transLoadingProgres(true))
            dispatch(setCurrentPage(page))
            API.getNextTransactions({ login, cardid, pageSize, filter, sort, page })
                .then(data => {
                    dispatch(getTransactions(data.data))
                    dispatch(transLoadingProgres(false))
                })
        }
    },

    addTransaction: form => async dispatch => {
        const res = await API.addTransaction(form)
        dispatch(addTransaction(res))
        if (res.status >= 400) {
            dispatch({
                type: "REQUEST_ERROR"
            })
        }
    },
    deleteTransaction: (id) => async dispatch => {
        dispatch(deleteTransaction(id));
        API.deleteTransaction(id)
    },
    editTrans: form => async dispatch => {
        const res = await API.editTransaction(form)
        dispatch(showModal({
            type: res.type,
            message: res.message
        }))
        if (res.type === 'message') {
            dispatch(getTransaction(res.data))
        }
    },

}

export default transactionSlice.reducer