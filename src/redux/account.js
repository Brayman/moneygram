
import { API } from "../api/api";

import {
    SET_BALANCE,
    SUBTRACT_BALANCE,
    CHANGE_SETTINGS,
    CREATE_CARD,
    SAVE_SETTINGS,
    SET_CARDS,
    SET_USER
} from "./action-types";

const defaultState = {
    isAuth: false,
 

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
    subtractBalance: (cardBalance) => {
        return {
            type: SUBTRACT_BALANCE,
            payload: cardBalance
        } 
    }
}
export const accounThunks = {
    getBalanse: (login) => async dispatch => {
        const res = await API.getBalance(login)
        dispatch(accontActions.setBalance(res.data))
    },
    subtractBalance: (from, to, amount) => async (dispatch) => {
        const res = await API.converteReq(from, to, amount)
        dispatch(accontActions.addToBalance(res.data.result))
    }
}

export default account;