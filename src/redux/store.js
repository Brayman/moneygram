import { combineReducers, createStore } from "redux";
import account from "./account";
import transactions from "./transactions";
const reducers = combineReducers({
    transactions,
    account
})


const store = createStore(reducers);
export default store;