import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import account from "./account";
import transactions from "./transactions";
import { reducer as formReducer } from "redux-form";
const reducers = combineReducers({
    transactions,
    account,
    form: formReducer
})


const store = createStore(reducers, applyMiddleware(thunk));
export default store;