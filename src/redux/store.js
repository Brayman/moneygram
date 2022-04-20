import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import account from "./account";
import transactions from "./transactions";
const reducers = combineReducers({
    transactions,
    account
})


const store = createStore(reducers, applyMiddleware(thunk));
export default store;