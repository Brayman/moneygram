import { applyMiddleware, compose, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import account from "./account";
import card from "./card";
import filter from "./filter";
import { reducer as formReducer } from "redux-form";
import app from "./app";

const reducers = combineReducers({
    filter,
    card,
    account,
    app,
    form: formReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers,  composeEnhancers(
 applyMiddleware(thunk)));
export default store;
window.store = store;