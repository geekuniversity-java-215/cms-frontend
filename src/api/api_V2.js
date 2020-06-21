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
    // baseURL: "http://localhost:8189/"
    baseURL: "31.210.208.189:8090/"
});

export const authAPI = {
    me(api_key) {
        return instance.get(`me`, {
            headers: {
                "api_key": api_key
            }
        });
    },
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
        return instance.post(`/registration/new`, request(firstName, lastName, email, phone, role))
    }
};

export const orderAPI = {
    create(Mass, Length, Width, Height,
           RegionA, CityA, StreetA, BuildingA,
           BlockA, FlatA, FloorA, IntercomA,
           RegionB, CityB, StreetB, BuildingB,
           BlockB, FlatB, FloorB, IntercomB,
           Phone, Comments) {
        return instance.post('order', {Mass, Length, Width, Height,
            RegionA, CityA, StreetA, BuildingA,
            BlockA, FlatA, FloorA, IntercomA,
            RegionB, CityB, StreetB, BuildingB,
            BlockB, FlatB, FloorB, IntercomB,
            Phone, Comments})
    },
    confirm(isFragile, isUrgent, finalCost) {
        return instance.post('order_confirm', {
            isFragile, isUrgent, finalCost
        })
    }
};
