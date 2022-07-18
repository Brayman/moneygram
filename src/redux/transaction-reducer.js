import { API } from "../api/api"
import { GET_TRANSACTION } from "./action-types"



const transaction = (state = null, { type, payload }) => {
    switch (type) {
        case GET_TRANSACTION:
            return {
                ...payload,
            }
        default:
            return state
    }
}

const actions = {
    getTransaction(transaction) {
        return {
            type: GET_TRANSACTION,
            payload: transaction
        }
    }
}

export const transactionThunks = {
    getTransaction:  (id) => async (dispatch) => {
        const res = await API.getTransaction(id)
        dispatch(actions.getTransaction(res))
    }
}

export default transaction
