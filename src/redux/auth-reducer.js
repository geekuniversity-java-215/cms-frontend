import {authAPI} from "../api/api";
import React from "react";
import {api_wrapper} from "../api/api_wrapper";
import {
    getDecodeJWT,
    getLocalAccessToken,
    getLocalRefreshToken, removeLocalAccessToken, removeLocalRefreshToken,
    setLocalAccessToken,
    setLocalRefreshToken
} from "../utils/tokens-handler";

const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    isAuth: false,
    role: 'Client',
    username: null
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

export const registration = (username, password, firstName, lastName, email, phone) => (dispatch) => {
    // authAPI.register(firstName, lastName, email, phone, role)
    api_wrapper('authAPI.register', {username, password, firstName, lastName, email, phone})
        .then(response => {
            alert(`На почтовый ящик ${response.data.params.email} отправлено письмо с подверждением регистрации`);
        })
};


export const login = (login, password) => (dispatch) => {
    authAPI.getTokens(login, password)
        .then(response => {
            if (response.status === 200) {
                let accessToken = response.data.accessToken;
                let refreshToken = response.data.refreshToken;
                setLocalAccessToken(accessToken);
                setLocalRefreshToken(refreshToken);
                dispatch(getAuthUserData());
            }
        })
};

export const logout = () => (dispatch) => {
    removeLocalAccessToken();
    removeLocalRefreshToken()
        .then(dispatch(setAuthUserData(null, false)));

};

export const getAuthUserData = () => (dispatch) => {
    return getLocalAccessToken()
        .then(accessToken => {
            return getDecodeJWT(accessToken)
        })
        .then(decodeAccessToken => {
                console.log('access token is ok');
                if (decodeAccessToken.exp > (Date.now() / 1000)) {
                    dispatch(setAuthUserData(decodeAccessToken.sub, true))
                } else {
                    dispatch(setAuthUserData(null, false));
                    getLocalRefreshToken()
                        .then(refreshToken => {
                            return getDecodeJWT(refreshToken)
                        })
                        .then(decodeRefreshToken => {
                            if (decodeRefreshToken.exp > (Date.now() / 1000)) {
                                console.log('refresh token is ok');
                                getLocalRefreshToken()
                                    .then(refreshToken => {
                                        authAPI.refreshTokens(refreshToken)
                                            .then(response => {
                                                if (response.status === 200) {
                                                    console.log(response.data);
                                                    setLocalAccessToken(response.data.accessToken)
                                                    setLocalRefreshToken(response.data.refreshToken);
                                                    dispatch(setAuthUserData(decodeAccessToken.sub, true))
                                                }
                                            })
                                    })
                            }
                        })
                }
            }
        )

};

export const setAuthUserData = (username, isAuth) => ({
    type: SET_USER_DATA, payload:
        {username, isAuth}
});

export default authReducer;