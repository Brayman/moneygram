import { stopSubmit } from "redux-form";
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
export const updateProfileThunk = (login,items) => dispatch => {
    API.updateProfile(login,items)
    .then(data => {
        data.status === 200 ? 
        dispatch(settingsSaveAC(items)) :
        dispatch({type: "ERROR_REQVEST"})
    })
}
export const AuthThunk = login => dispatch => {
    API.Login(login)
    .then(data => {
        console.log(data);
        if (data >= 400) {
            
            dispatch(stopSubmit("login",{_error: "login or password wrong"}))
        } else {
            dispatch(setUserAC(data.data))
            API.getCards()
            .then(data => {
                dispatch(setCardsAC(data))
            })
        }
    })
}
export const SignUp = formData => dispatch => {
    API.SignUp({
        ...formData,
        id: new Date().getTime()
    })
    .then(data => {
        dispatch(setUserAC(data))
    })

}
export default account;