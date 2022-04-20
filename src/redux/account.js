import { API } from "../api/api";
import {
    ADD_TRANSACTION,
    CHANGE_SETTINGS,
    SAVE_SETTINGS,
    SET_CARDS,
    SET_NEXT_CARD,
    SET_PERV_CARD,
    SET_USER
} from "./action-types";

const defaultState = {
    isAuth: false,
    selectCard: 0,
    cards: [{
        "id": 1,
        "curency": null,
        "balance": null
    }],
    settings: {
        first_name: '',
        second_name: '',
        mail: ''
    }

}
const account = (state = defaultState, {type, payload}) => {
    switch (type) {
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
        case SET_CARDS:
            return {
                ...state,
                cards: payload
            }
        case SET_NEXT_CARD:
            return {
                ...state,
                selectCard: ++state.selectCard
            }
        case SET_PERV_CARD:
            return {
                ...state,
                selectCard: --state.selectCard
            }
        case SET_USER:
            return {
                ...state,
                isAuth: true,
                ...payload
            }
        case SAVE_SETTINGS:
            return {
                ...state,
                ...state.settings
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
export const settingsSaveAC = () => {
    return {
        type: SAVE_SETTINGS
    }
}
export const setCardsAC = data => {
    return {
        type: SET_CARDS,
        payload: data
    }
}
export const setUserAC = data => {
    return {
        type: SET_USER,
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
export const getCardsThunk = () => dispatch => {
    API.getCards()
    .then(data => {
        dispatch(setCardsAC(data))
    })
}
export const setUserThunk = login => dispatch => {
    API.getUser(login)
    .then(data => {
        dispatch(setUserAC(data))
    })
}
export const AuthThunk = login => dispatch => {
    API.getUser(login)
    .then(data => {
        dispatch(setUserAC(data))
        API.getCards()
        .then(data => {
            dispatch(setCardsAC(data))
        })
    })
}

export default account;