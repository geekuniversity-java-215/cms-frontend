import React from "react";
import * as jwtDecode from "jwt-decode";

export const getLocalAccessToken = ()=> {
    return new Promise(resolve => {
            resolve( localStorage.getItem("accessToken"))
        }
    )
};
export let getLocalRefreshToken = () => {
    return new Promise(resolve => {
           resolve( localStorage.getItem("refreshToken"))
        }
    )
};
export let getDecodeJWT = (accessToken) => {
    return new Promise(resolve => {
            resolve( jwtDecode(accessToken))
        }
    )
};
export let setLocalAccessToken = (accessToken) => {
    return new Promise(resolve => {
            localStorage.setItem("accessToken", accessToken)
        }
    )
};
export let setLocalRefreshToken = (refreshToken) => {
    return new Promise(resolve => {
            localStorage.setItem("refreshToken", refreshToken)
        }
    )
};

export let removeLocalAccessToken = () => {
    return new Promise(resolve => {
            localStorage.removeItem("accessToken")
        }
    )
};
export let removeLocalRefreshToken = () => {
    return new Promise(resolve => {
            localStorage.removeItem("refreshToken")
        }
    )
};

