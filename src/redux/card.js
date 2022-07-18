import { API } from "../api/api";
import {
    SET_WALLET,
    SET_WALLETS
} from "./action-types";

const defaultState = {
    isLoading: false,
    cards: [],
    wallet: null
}
const card = (state = defaultState, { type, payload }) => {
    switch (type) {
        case SET_WALLETS:
            return {
                ...state,
                cards: payload,
            }
        case SET_WALLET:
            return {
                ...state,
                wallet: payload
            }
        default: return state;
    }
}

export const actions = {
    setWallet: (wallet) => {
        return {
            type: SET_WALLET,
            payload: wallet
        }
    },
    setWallets: wallets => {
        return {
            type: SET_WALLETS,
            payload: wallets
        }
    }
}
export const walletThunks = {
    getWallet: id => async dispatch => {
        const wallet = await API.getWallet(id)
        dispatch(actions.setWallet(wallet.data))
    },
    getWallets: login => async dispatch => {
        const wallets = await API.getWallets(login)
        dispatch(actions.setWallets(wallets))
    },
    editWallet: (id, form) => async dispatch => {
        const wallet = await API.editWallet(id, form)
        dispatch(actions.setWallet(wallet))
    },
    createWallet: (form) => async dispatch => {
        const res = await API.createWallet(form)
        if (res.status < 400) {
            dispatch(actions.setWallet(res.data))
        }
    },
}

export default card;
