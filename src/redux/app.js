import { API } from "../api/api";
import { createSlice } from "@reduxjs/toolkit";
import { accountThunks, setUser } from "./account";
import { walletThunks } from "./wallets";

const initialState = {
    initialized: false,
    isAuth: false,
    modal: {
        showModal: false,
        message: '',
        type: ''
    },
    login: {
        loading: false,
        error: false,
        message: ''
    }

}

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        AuthSuccess: (state) => {
            state.isAuth = true
        },
        AuthFailure: (state) => {
            state.isAuth = false
            state.initialized = false
        },
        initialize: (state) => {
            state.initialized = true
        },
        showModal: (state, { payload }) => {
            state.modal = {...payload, showModal: true}
        },
        hideModal: state => {
            state.modal = initialState.modal
        }
    }
})

export const { AuthSuccess, AuthFailure, initialize, showModal, hideModal } = appSlice.actions

export const initializeApp = (user) => dispatch => {
    console.log(user);
    Promise.all([
        dispatch(setUser(user)),
        dispatch(walletThunks.getWallets(user.login)),
        dispatch(accountThunks.getBalanse(user.login)),
        dispatch(accountThunks.getExpense(user.login)),
        dispatch(accountThunks.getIncome(user.login)),
        dispatch(AuthSuccess())
    ])
        .then(() => dispatch(initialize()))
}
export const checkAuth = () => async dispatch => {
    try {
        const res = await API.checkAuth()
        dispatch(initializeApp(res))
    } catch (error) {
        dispatch(AuthFailure())
    }
}

export default appSlice.reducer
