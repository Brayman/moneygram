import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    filter: undefined,
    sort: {
        order: 'desc',
        field: 'date'
    }
}

const filterSlice = createSlice({
    name: 'sort',
    initialState,
    reducers: {
        setSort: (store, { payload }) => {
           store.sort.field = payload.field
           store.sort.order = payload.order
        },
        setFilter: (store, { payload }) => {
           store.filter = payload
        },
        resetFilter: (store) => {
            store.filter = initialState.filter
            store.sort = initialState.sort
        }
    }
})

export const actions = filterSlice.actions

export default filterSlice.reducer
