import { RESET_FILTER, SET_FILTER, SET_SORT } from "./action-types"

export const actions = {
    setSort: ({ order, field }) => {
        return {
            type: SET_SORT,
            payload: {
                order,
                field
            }
        }
    },
    setFilter: (field) => {
        return {
            type: SET_FILTER,
            payload: field
        }
    },
    resetFilter: () => {
        return {
            type: RESET_FILTER
        }
    }
}


const initialState = {
    filter: undefined,
    sort: {
        order: 'desc',
        field: 'date'
    }
}

 export const filter = (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_SORT:
            return {
                ...state,
                sort: payload
            }
        case SET_FILTER:
            return {
                ...state,
                filter: payload
            }
        case RESET_FILTER:
            return initialState
        default:
            return state
    }
}
