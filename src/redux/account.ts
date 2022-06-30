
import { API } from "../api/api";
import { reduxActionType } from "../types";

import {
    ADD_TRANSACTION,
    CHANGE_SETTINGS,
    CREATE_CARD,
    SAVE_SETTINGS,
    SET_CARDS,
    SET_USER
} from "./action-types";

const defaultState = {
    isAuth: false

}
const account = (state = defaultState, {type, payload}: reduxActionType) => {
    switch (type) {
        case SET_USER:
            return {
                ...state,
                isAuth: true,
                ...payload
            }
        case CHANGE_SETTINGS:
            return {
                ...state
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

export const settingsSaveAC = (items: any) => {
    return {
        type: SAVE_SETTINGS,
        payload: items
    }
}
export const setCardsAC = (data: any) => {
    return {
        type: SET_CARDS,
        payload: data
    }
}
export const createCardAC = (data: any) => {
    return {
        type: CREATE_CARD,
        payload: data
    }
}
export const CreateCard = (card: any) => (dispatch: any) => {
    API.addCard(card)
    .then(data => {
        console.log(data);
        dispatch(createCardAC(card))
    })
}



export default account;