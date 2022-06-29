
import { API } from "../api/api";
import { add, subtract } from "../utils/saveOperations";

import {
    ADD_TO_BALANCE,
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
        case ADD_TO_BALANCE:
            return {
                ...state,
                balance: add(state.balance, payload)
            }
        case SUBTRACT_BALANCE:
            return {
                ...state,
                balance: subtract(state.balance, payload)
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
    addToBalance: (cardBalance) => {
        return {
            type: ADD_TO_BALANCE,
            payload: cardBalance
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
    addToBalance: (from, to, amount) => async (dispatch) => {
        const res = await API.converteReq(from, to, amount)
        dispatch(accontActions.addToBalance(res.data.result))
    },
    subtractBalance: (from, to, amount) => async (dispatch) => {
        const res = await API.converteReq(from, to, amount)
        dispatch(accontActions.addToBalance(res.data.result))
    }
}

export default account;