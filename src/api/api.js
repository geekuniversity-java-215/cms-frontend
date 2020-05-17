import * as axios from "axios";


let request = (params) => {
    return {
        id: 1,
        method: "registration",
        params
    }
};

const instance = axios.create({
    baseURL: "http://31.210.208.189:8090/"
});

export const authAPI = {
    getTokens(username, password) {
        let basicAuth = 'Basic ' + btoa(username + ':' + password);
        return instance.post('oauzz/token/get',{},{headers: {Authorization: basicAuth}})
    },
    refreshTokens(refreshToken) {
        let auth = 'Bearer ' + refreshToken;
        return instance.post('oauzz/token/refresh', {}, {headers: {Authorization: auth}})
    },

    login(login, password) {
        return instance.post(`login`, {login, password});
    },
    logout(api_key) {
        return instance.delete(`login`, {
            headers: {
                "api_key": api_key
            }
        });
    },
    register(firstName, lastName, email, phone, role) {
        return instance.post(`register`, request({firstName, lastName, email, phone, role}))
    }
};

export const orderAPI = {
    create(Mass, Length, Width, Height,
           RegionA, CityA, StreetA, BuildingA,
           BlockA, FlatA, FloorA, IntercomA,
           RegionB, CityB, StreetB, BuildingB,
           BlockB, FlatB, FloorB, IntercomB,
           Phone, Comments) {
        return instance.post('order', {
            Mass, Length, Width, Height,
            RegionA, CityA, StreetA, BuildingA,
            BlockA, FlatA, FloorA, IntercomA,
            RegionB, CityB, StreetB, BuildingB,
            BlockB, FlatB, FloorB, IntercomB,
            Phone, Comments
        })
    },
    confirm(isFragile, isUrgent, finalCost) {
        return instance.post('order_confirm', {
            isFragile, isUrgent, finalCost
        })
    }
};