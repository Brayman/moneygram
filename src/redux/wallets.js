import { createSlice } from "@reduxjs/toolkit";
import { API } from "../api/api";

const initialState = {
    isLoading: false,
    wallets: [],
    wallet: null
}

const walletSlice = createSlice({
    name: 'wallet',
    reducers: {
        setWallet: (store, {payload}) => {
            store.wallet = payload
        },
        setWallets: (store, {payload}) => {
            store.wallets = payload
            if (store.wallet === null) {
                store.wallet = payload[0]
            }
        }
    },
    initialState,
})


export const { setWallet, setWallets } = walletSlice.actions

export const walletThunks = {
    getWallet: id => async dispatch => {
        const wallet = await API.getWallet(id)
        dispatch(setWallet(wallet.data))
    },
    getWallets: login => async dispatch => {
        const wallets = await API.getWallets(login)
        dispatch(setWallets(wallets))
    },
    editWallet: (id, form) => async dispatch => {
        const wallet = await API.editWallet(id, form)
        dispatch(setWallet(wallet))
    },
    createWallet: (form) => async dispatch => {
        const res = await API.createWallet(form)
        if (res.status < 400) {
            dispatch(setWallet(res.data))
        }
    },
}

export default walletSlice.reducer;
