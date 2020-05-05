import {authAPI} from "../api/api";
import React from "react";

const SET_USER_DATA = 'SET_USER_DATA';


let initialState = {
    id: null,
    avatar: null,
    fullName: null,
    role: null,
    location: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };
        default:
            return state;
    }
};

export const registration = (firstName, lastName, email, phone, role) => (dispatch) => {
    authAPI.register(firstName, lastName, email, phone, role)
        .then(response => {
            if (response.status === 200) {
                alert(`На почтовый ящик ${response.data.params.email} отправлено письмо с подверждением регистрации`);
            }
        })
};


export const login = (login, password) => (dispatch) => {
    authAPI.login(login, password)
        .then(response => {
            if (response.status === 200) {
                let key = response.headers['api_key'];
                let promise = new Promise(resolve => {
                    localStorage.setItem("api_key", key)
                });
                promise.then(dispatch(getAuthUserData()));
            }
        })
};

export const logout = () => (dispatch) => {
    let api_key;
    let promise = new Promise(resolve => {
        api_key = localStorage.getItem("api_key")
    });
    promise.then(authAPI.logout(api_key)
        .then(response => {
            if (response.status === 200) {
                localStorage.removeItem("api_key");
                dispatch(setAuthUserData(null, null, null, null, null, false));
            }
        }))

}

export const getAuthUserData = () => (dispatch) => {
    let api_key;
    let promise = new Promise((resolve, reject) => {
        api_key = localStorage.getItem("api_key");
        if (api_key===undefined) {
            reject(alert("wrong API-KEY"))
        }
        resolve(api_key);

    });
    return promise
        .then(api_key => authAPI.me(api_key))
        .then(response => {
            if (response.status === 200) {
                let {id, avatar, fullName, role, location} = response.data;
                dispatch(setAuthUserData(id, avatar, fullName, role, location, true))
            }
        });
};

export const setAuthUserData = (id, avatar, fullName, role, location, isAuth) => ({
    type: SET_USER_DATA, payload:
        {id, avatar, fullName, role, location, isAuth}
});

export default authReducer;