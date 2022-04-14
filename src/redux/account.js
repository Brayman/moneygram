import {
    ADD_TRANSACTION,
    CHANGE_SETTINGS,
    SAVE_SETTINGS
} from "./action-types";

const defaultState = {
    login: 'brayman',
    first_name: '',
    balance: 299,
    spend: 15,
    avatar: null,
    mail: 'my@mail.com',
    language: 'en',
    card: 1,
    settings: {
        first_name: '',
        second_name: '',
        mail: ''
    }

}
const account = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_TRANSACTION:
            console.log(action);
            return {
                ...state,
                balance: state.balance - action.payload
            }
        case CHANGE_SETTINGS:
            return {
                ...state,
                settings: {
                    ...state.settings,
                    [action.payload.item]: action.payload.value
                }
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
export default account;