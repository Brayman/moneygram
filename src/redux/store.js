import wallet from "./wallets";
import filter from "./filter";
import transactions from "./transactions-reducer";
import app from "./app";
import { configureStore } from "@reduxjs/toolkit";
import accountSlice from "./account";

export const store = configureStore({
    reducer: {
        account: accountSlice.reducer,
        app,
        wallet,
        transactions,
        filter
    }
})

export default store;
window.store = store;