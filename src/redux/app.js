import {
    INITIALIZE_SUCCESS,
    SET_USER,
    START_LOGIN,
    FAIL_LOGIN,
    SHOW_MODAL,
    HIDE_MODAL
} from "./action-types";
import { accountThunks } from "./actions/account-actions";

const initialState = {
    initialized: false,
    isAuth: false,
    modal: {
        showModal: false,
        message: '',
        type: ''
    },
    login: {
        loading: false,
        error: false
    }

}
const AppReducer = (state = initialState, { type, payload }) => {
    switch (type) {
        case INITIALIZE_SUCCESS:
            return ({
                ...state,
                initialized: true
            })
        case SHOW_MODAL:
            return ({
                ...state,
                modal: {
                    showModal: true,
                    message: payload.message,
                    type: payload.type
                }
            })
        case HIDE_MODAL:
            return ({
                ...state,
                modal: {
                    showModal: false
                }
            })
        case SET_USER:
            return ({
                ...state,
                isAuth: true,
                login: {
                    ...state.login,
                    loading: false
                }
            })
        case START_LOGIN:
            return ({
                ...state,
                login: {
                    ...state.login,
                    loading: true
                }
            })
        case FAIL_LOGIN:
            return ({
                ...state,
                login: {
                    ...state.login,
                    error: true,
                    loading: false
                }
            })
        default:
            return state;
    }
}
export const appActions = {
    initialize: () => {
        return ({
            type: INITIALIZE_SUCCESS
        })
    },
    showModal: message => {
        return ({
            type: SHOW_MODAL,
            payload: message

        })
    },
    hideModal: () => {
        return ({
            type: HIDE_MODAL
        })
    }

}
export const initializeApp = (login) => dispatch => {
    const promise = dispatch(accountThunks.AuthThunk(login))
    promise.then(() => {
        dispatch(appActions.initialize())
    })
}




export default AppReducer;