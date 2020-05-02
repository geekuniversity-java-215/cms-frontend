import * as axios from "axios";


let request = (params) => {
    return {

        id: 1,
        method: "registration",
        params
    }
};

const instance = axios.create({
    // baseURL: "https://equipment-rest.herokuapp.com/",

    baseURL: "http://localhost:8189/"
});

export const authAPI = {
    me(api_key) {
        return instance.get(`me`, {
            headers: {
                "api_key": api_key
            }
        });
    }
    ,
    login(login, password) {
        return instance.post(`login`, {login, password});
    },
    logout(api_key) {
        return instance.delete(`login`, {
            headers: {
                "api_key": api_key
            }});
    },
    register(firstName, lastName, email, phone, role) {
        return instance.post(`register`, request({firstName, lastName, email, phone, role}))
    }
};