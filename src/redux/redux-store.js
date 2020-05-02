import {reducer as formReducer} from 'redux-form';
import {applyMiddleware, combineReducers, createStore} from "redux";
import authReducer from "./auth-reducer";
import thunk from "redux-thunk";
import appReducer from "./app-reducer";


let reducers = combineReducers({
    auth: authReducer,
    form: formReducer,
    app: appReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;