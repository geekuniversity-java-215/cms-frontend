import {authAPI} from "../api/api";
import React from "react";

const SET_USER_DATA = 'SET_USER_DATA';


let initialState = {
    firstName: null,
    lastName: null,
    email: null,
    isAuth: false
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.data,
                isAuth: true
            };
        default:
            return state;
    }
};

export const registration = (firstName, lastName, email, phone, role) => (dispatch) => {
    authAPI.register(firstName, lastName, email, phone, role)
        .then (response=> {
            if (response.status ===200){
               alert(`На почтовый ящик ${response.data.params.email} отправлено письмо с подверждением регистрации`);
                dispatch(setAuthUserData(firstName, lastName, email, true));
            }
        })
};

export const setAuthUserData = (firstName, lastName, email, isAuth) => ({type: SET_USER_DATA, payload:
        {firstName, lastName, email, isAuth}  });

export default authReducer;