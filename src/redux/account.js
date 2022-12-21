import { createSlice } from "@reduxjs/toolkit";
import { API } from "../api/api";

import { initializeApp } from "./app";

const accountSlice = createSlice({
    name: 'account',
    initialState: {
        isAuth: false,
        user: {
            loading: false,
            income: 0,
            expense: 0
        }

    },
    reducers: {
        setUser: (state, { payload }) => {
            console.log(payload);
            state.user = { ...payload, loading: false }
            state.isAuth = true
        },
        setBalance: (state, { payload }) => {
            state.user.balance = payload
        },
        setIncome: (state, { payload }) => {
            state.user.income = payload
        },
        setExpense: (state, { payload }) => {
            state.user.expense = payload
        },
        startLogin: state => {
            state.user.loading = true
        },
        errorLogin: state => {
            state.user.loading = false
        }

    }
})

export const { setUser, setBalance, setExpense, setIncome, errorLogin } = accountSlice.actions

export const accountThunks = {
    getBalanse: (login) => async dispatch => {
        const res = await API.getBalance(login)
        console.log(res.data);
        dispatch(setBalance(res.data))
    },
    getIncome: (login) => async dispatch => {
        const income = await API.getIncome(login)
        dispatch(setIncome(income))
    },
    getExpense: (login) => async dispatch => {
        const expense = await API.getExpense(login)
        dispatch(setExpense(expense))
    },
    SignUp: formData => dispatch => {
        API.SignUp({
            ...formData,
        })
            .then(data => {
                dispatch(setUser(data))
            })
    },
    loadUser: id => dispatch => {
        API.getUser(id)
            .then(data => dispatch(setUser(data)))
    },
    Login: login => dispatch => {

        return API.Login(login)
    },
    Auth: (user) => async dispatch => {
        dispatch(initializeApp(user))
    },
    AuthThunk: login => async dispatch => {
        const res = await API.Login(login)
        if (res.status >= 400) {
            dispatch(errorLogin(res.message))
        } else {
            dispatch(this.Auth(res.data))
        }
    }
}


export default accountSlice
