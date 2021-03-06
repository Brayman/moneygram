import { API } from "../../api/api"
import { v4 as uuidv4 } from 'uuid';
import { FAIL_LOGIN, SET_USER, START_LOGIN } from "../action-types";
import { appActions } from "../app";
const actions = {
    setUser: data => {
        return {
            type: SET_USER,
            payload: data
        }
    },
    startLogin: () => {
        return {
            type: START_LOGIN
        }
    },
    errorLogin: message => {
        return {
            type: FAIL_LOGIN,
            payload: message
        }
    }
}
export const accountThunks = {
    SignUp: formData => dispatch => {
        API.SignUp({
            ...formData,
            id: uuidv4()
        })
            .then(data => {
                dispatch(actions.setUser(data))
            })
    },
    loadUser: id => dispatch => {
        API.getUser(id)
            .then(data => dispatch(actions.setUser(data)))
    },
    Login: login => dispatch => {

        return API.Login(login)
    },
    Auth: (login) => async dispatch => {
        const loginP = dispatch(accountThunks.Login(login))
        const cardP = dispatch(accountThunks.Card(login))
        Promise.all([loginP, cardP]).then(
            (data) => console.log(data)
        )
    },
    AuthThunk: login => async dispatch => {
        dispatch(actions.startLogin())
        const resp = await API.Login(login)
        if (resp.status >= 400) {
            dispatch(actions.errorLogin(resp.message))
        } else {
            dispatch(actions.setUser(resp.data.user))
            localStorage.setItem('token', resp.data.accessToken)
            dispatch(appActions.initialize())
        }
    }
}