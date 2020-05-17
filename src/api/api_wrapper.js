import {promiseTimeout} from "./timeoutPromise";
import {authAPI} from "./api_V2";

let id = 0;
const TIMEOUT = 5000;

let stackRequests = [];


export const api_wrapper = (method, params) => {
    id++;
    switch (method) {
        case 'authAPI.register': {
            stackRequests.push({id: id, resp: promiseTimeout(TIMEOUT, authAPI.register(params))});
            break;
        }
        case 'authAPI.login': {
            stackRequests.push({id: id, resp: promiseTimeout(TIMEOUT, authAPI.login(params))});
            break;
        }
    }
    for (let i = 0; i < stackRequests.length; i++) {

        if (stackRequests[i].id === id) {
            let afterTimeoutCheck = stackRequests[i].resp;
            return afterTimeoutCheck
                // .then(response=>{
                //      response;
                //     }
                // )
                .catch(error=>{alert(error)})
        }


    }
};