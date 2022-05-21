import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import account from "./account";
import card from "./card";
import { reducer as formReducer } from "redux-form";
import app from "./app";

const reducers = combineReducers({
    card,
    account,
    app,
    form: formReducer
})


const store = createStore(reducers, applyMiddleware(thunk));
export default store;
window.store = store;