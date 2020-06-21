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
    getTokens(params) {
        let basicAuth = 'Basic ' + btoa(params.login + ':' + params.password);
        return instance.post('oauzz/token/get', {}, {headers: {Authorization: basicAuth}})
    },
    refreshTokens(refreshToken) {
        let auth = 'Bearer ' + refreshToken;
        return instance.post('oauzz/token/refresh', {}, {headers: {Authorization: auth}})
    },

    // login(login, password) {
    //     return instance.post(`login`, {login, password});
    // },
    logout(api_key) {
        return instance.delete(`login`, {
            headers: {
                "api_key": api_key
            }
        });
    },
    register(params) {
        let basicAuth = 'Basic ' + btoa('registrar' + ':' + 'registrar');
        return instance.post(`registration/new`, {
            username:params.username,
            password:params.password,
            firstName:params.firstName,
            lastName:params.lastName,
            email:params.email,
            phoneNumber:params.phoneNumber
        }, {
            headers: {
                Authorization: basicAuth,
                'Content-Type': 'application/json'
            }})
            .then(response=> {
              instance.get('registration/confirm?token='+response.data);
            })
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

export const accountAPI = {
  takeMoney(transferAccount, loginPayPal) {
      return instance.post('paypal', {transferAccount, loginPayPal
      })
  }
};