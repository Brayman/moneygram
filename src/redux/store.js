import { applyMiddleware, compose, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import account from "./account";
import card from "./card";
import { filter } from "./filter";
import transactions from "./transactions-reducer";
import transaction from "./transaction-reducer";
import app from "./app";

const reducers = combineReducers({
    transaction,
    transactions,
    filter,
    card,
    account,
    app
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunk)));
export default store;
window.store = store;