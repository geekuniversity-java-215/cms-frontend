import * as axios from "axios";



let request = (params) => {
    return {
        id: 1,
        method: "registration",
        params
    }
};

const instance = axios.create({
    baseURL: "https://equipment-rest.herokuapp.com/",
});

export const authAPI = {
    register(firstName, lastName, email, phone, role) {
        return instance.post(`register`, request({firstName, lastName, email, phone, role}))
    }
};