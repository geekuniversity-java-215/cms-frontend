import {promiseTimeout} from "./timeoutPromise";
import {accountAPI, authAPI} from "./api";
import {ordersAPI, usersAPI} from "./apiJRPC";

let id = 0;
const TIMEOUT = 5000;

let stackRequests = [];


export const api_wrapper = (method, params) => {

    switch (method) {
        case 'authAPI.register': {
            id++;
            stackRequests.push({id: id, resp: promiseTimeout(TIMEOUT, authAPI.register(params))});
            return id;
        }
        case 'authAPI.getTokens': {
            id++;
            stackRequests.push({id: id, resp: promiseTimeout(TIMEOUT, authAPI.getTokens(params))});
            return id;
        }
        case 'authAPI.refreshTokens': {
            id++;
            stackRequests.push({id: id, resp: promiseTimeout(TIMEOUT, authAPI.refreshTokens(params))});
            return id;
        }

        // JRPC methods
        case 'ordersAPI.saveOrder': {
            id++;
            stackRequests.push({id: id, resp: promiseTimeout(TIMEOUT, ordersAPI.saveOrder(id, params))});
            return id;
        }

        case 'accountAPI.takeMoney': {
            id++;
            stackRequests.push({id: id, resp: promiseTimeout(TIMEOUT, accountAPI.takeMoney(id, params))});
            return id
        }
        case 'usersAPI.getCurrentUser' : {
            id++;
            stackRequests.push({id: id, resp: promiseTimeout(TIMEOUT, usersAPI.getCurrentUser(id, params))});
            return id
        }
        case 'usersAPI.makeClient' : {
            id++;
            stackRequests.push({id: id, resp: promiseTimeout(TIMEOUT, usersAPI.makeClient(id, params))});
            return id
        }
        case 'usersAPI.makeCourier' : {
            id++;
            stackRequests.push({id: id, resp: promiseTimeout(TIMEOUT, usersAPI.makeCourier(id, params))});
            return id
        }
    }
};


export const findResponseById = async (id) => {
    for (let i = 0; i < stackRequests.length; i++) {
        if (stackRequests[i].id === id) {
            try {
                return await stackRequests[i].resp;
            } catch (e) {
                alert(e)
            }
        }
    }
};