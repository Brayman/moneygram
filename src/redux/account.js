
import { API } from "../api/api";

import {
    SET_BALANCE,
    CHANGE_SETTINGS,
    CREATE_CARD,
    SAVE_SETTINGS,
    SET_CARDS,
    SET_USER,
    SET_EXPENSE,
    SET_INCOME
} from "./action-types";

const defaultState = {
    isAuth: false,
    income: 0,
    expense: 0,

}
const account = (state = defaultState, { type, payload }) => {
    switch (type) {
        case SET_USER:
            return {
                ...state,
                isAuth: true,
                ...payload
            }
        case SET_BALANCE:
            return {
                ...state,
                balance: payload
            }
        case SET_EXPENSE:
            return {
                ...state,
                expense: payload
            }
        case SET_INCOME:
            return {
                ...state,
                income: payload
            }
        case CHANGE_SETTINGS:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    [payload.item]: payload.value
                }
            }
        case SAVE_SETTINGS:
            return {
                ...state,
                ...payload
            }
        default:
            return state;
    }
}
export const settingsChangeAC = (item, value) => {
    return {
        type: CHANGE_SETTINGS,
        payload: {
            item,
            value
        }
    }
}
export const settingsSaveAC = (items) => {
    return {
        type: SAVE_SETTINGS,
        payload: items
    }
}
export const setCardsAC = data => {
    return {
        type: SET_CARDS,
        payload: data
    }
}
export const createCardAC = data => {
    return {
        type: CREATE_CARD,
        payload: data
    }
}
export const CreateCard = (card) => dispatch => {
    API.addCard(card)
        .then(data => {
            console.log(data);
            dispatch(createCardAC(card))
        })
}
export const updateProfileThunk = (login, items) => dispatch => {
    API.updateProfile(login, items)
        .then(data => {
            data.status === 200 ?
                dispatch(settingsSaveAC(items)) :
                dispatch({ type: "ERROR_REQVEST" })
        })
}
export const accontActions = {
    setBalance: (balance) => {
        return {
            type: SET_BALANCE,
            payload: balance
        } 
    },
    setIncome: (amount) => {
        return {
            type: SET_INCOME,
            payload: amount
        } 
    },
    setExpense: (amount) => {
        return {
            type: SET_EXPENSE,
            payload: amount
        } 
    }
}
export const accounThunks = {
    getBalanse: (login) => async dispatch => {
        const res = await API.getBalance(login)
        dispatch(accontActions.setBalance(res.data))
    },
    getIncome: (login) => async dispatch => {
        const income = await API.getIncome(login)
        dispatch(accontActions.setIncome(income))
    },
    getExpense: (login) => async dispatch => {
        const expense = await API.getExpense(login)
        dispatch(accontActions.setExpense(expense))
    }
}

export default account;