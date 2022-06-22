
import { API } from "../api/api";

import {
    ADD_TRANSACTION,
    CHANGE_SETTINGS,
    CREATE_CARD,
    SAVE_SETTINGS,
    SET_CARDS,
    SET_NEXT_CARD,
    SET_PERV_CARD,
    SET_USER
} from "./action-types";

const defaultState = {
    isAuth: false,
    settings: {
        first_name: '',
        second_name: '',
    }

}
const account = (state = defaultState, {type, payload}) => {
    switch (type) {
        case SET_USER:
            return {
                ...state,
                isAuth: true,
                ...payload
            }

        case ADD_TRANSACTION:
            return {
                ...state,
                balance: state.balance - payload
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
export const settingsChangeAC = (item,value) => {
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

export const setNextCardAC = data => {
    return {
        type: SET_NEXT_CARD,
        payload: data
    }
}
export const setPreviousCardAC = data => {
    return {
        type: SET_PERV_CARD,
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
export const updateProfileThunk = (login,items) => dispatch => {
    API.updateProfile(login,items)
    .then(data => {
        data.status === 200 ? 
        dispatch(settingsSaveAC(items)) :
        dispatch({type: "ERROR_REQVEST"})
    })
}


export default account;