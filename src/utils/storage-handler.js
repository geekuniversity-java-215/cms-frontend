import React from "react";
import * as jwtDecode from "jwt-decode";

export const getLocalAccessToken = () => {
    return new Promise(resolve => {
            resolve(localStorage.getItem("accessToken"))
        }
    )
};

export let getLocalRefreshToken = () => {
    return new Promise(resolve => {
            resolve(localStorage.getItem("refreshToken"))
        }
    )
};

export let getDecodeJWT = (accessToken) => {
    return new Promise(resolve => {
            resolve(jwtDecode(accessToken))
        }
    )
};

export let getUserRoleFromStorage = () => {
    return new Promise(resolve => {
            resolve(localStorage.getItem("roles"))
        }
    )
};

export let setLocalAccessToken = (accessToken) => {
    return new Promise(resolve => {
            resolve(localStorage.setItem("accessToken", accessToken))
        }
    )
};

export let setLocalRefreshToken = (refreshToken) => {
    return new Promise(resolve => {
            resolve(localStorage.setItem("refreshToken", refreshToken))
        }
    )
};

export let setUserRoleInStorage = (roles) => {
    return new Promise(resolve => {
            resolve(localStorage.setItem("roles",JSON.stringify(roles)))
        }
    )
};

export let removeLocalAccessToken = () => {
    return new Promise(resolve => {
            resolve(localStorage.removeItem("accessToken"))
        }
    )
};

export let removeLocalRefreshToken = () => {
    return new Promise(resolve => {
            resolve(localStorage.removeItem("refreshToken"))
        }
    )
};

export let removeLocalRoles = () => {
    return new Promise(resolve => {
            resolve(localStorage.removeItem("roles"))
        }
    )
};

export let removeLocalParams = () => {
    return new Promise(resolve => {
            resolve(localStorage.removeItem("params"))
        }
    )
};


export let switchRoleInStorage = async () => {
    let rolesToChange = await getUserRoleFromStorage();
    let rolesChanged = [];
    let rolesToChangeParsed = JSON.parse(rolesToChange.toString());
    rolesChanged.push(rolesToChangeParsed[1]);
    rolesChanged.push(rolesToChangeParsed[0]);
    await setUserRoleInStorage(rolesChanged);
    return (rolesChanged);
};



