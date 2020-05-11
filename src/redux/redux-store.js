import {reducer as formReducer} from 'redux-form';
import {applyMiddleware, combineReducers, createStore} from "redux";
import authReducer from "./auth-reducer";
import thunk from "redux-thunk";
import appReducer from "./app-reducer";
import orderReducer from "./order-reducer";
import {ordersReducer} from "./orders-reducer";


let reducers = combineReducers({
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    order: orderReducer,
    orders: ordersReducer
});

let store = createStore(reducers, applyMiddleware(thunk));

window.store = store;

export default store;