import { API } from "../../api/api"
import { v4 as uuidv4 } from 'uuid';
import { setCardsAC } from "../account";
import { FAIL_LOGIN, SET_USER, START_LOGIN } from "../action-types";
import { appActions } from "../app";
const actions = {
    setUser: (data: any) => {
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
    errorLogin: (message: any) => {
        return {
            type: FAIL_LOGIN,
            payload: message
        }
    }
}
export const accountThunks = {
    SignUp: (formData: any) => (dispatch: any) => {
        API.SignUp({
            ...formData,
            id: uuidv4()
        })
            .then(data => {
                dispatch(actions.setUser(data))
            })
    },
    loadUser: (id: string) => (dispatch: any) => {
        API.getUser(id)
            .then(data => dispatch(actions.setUser(data)))
        API.getCards(id)
            .then(data => {
                dispatch(setCardsAC(data));
            })
    },
    Login: (login: string) => (dispatch: any) => {

        return API.Login(login)
    },
    Card: (login: any) => (dispatch: any) => {
        return API.getCards(login.login)
    },
    Auth: (login: string) => async (dispatch: any) => {
        const loginP = dispatch(accountThunks.Login(login))
        const cardP = dispatch(accountThunks.Card(login))
        Promise.all([loginP, cardP]).then(
            (data) => console.log(data)
        )
    },
    AuthThunk: (login: string) => async (dispatch: any) => {
        dispatch(actions.startLogin())
        const resp: any = await API.Login(login);
        if (resp.status >= 400) {
            dispatch(actions.errorLogin(resp.message))
        } else {
            dispatch(actions.setUser(resp.data))
            const respCard = await API.getCards(resp.data.id)

            dispatch(setCardsAC(respCard));
            dispatch(appActions.initialize())
        }
    }
}