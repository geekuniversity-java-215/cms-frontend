import React from "react";
import {api_wrapper, findResponseById} from "../api/api_wrapper";
import {
    getDecodeJWT,
    getLocalAccessToken,
    getLocalRefreshToken,
    getUserRoleFromStorage,
    removeLocalAccessToken, removeLocalParams,
    removeLocalRefreshToken, removeLocalRoles,
    setLocalAccessToken,
    setLocalRefreshToken, setUserRoleInStorage
} from "../utils/storage-handler";

const SET_USER_DATA = 'SET_USER_DATA';
const SET_USER_ROLE_TO_STATE = 'SET_USER_ROLE_TO_STATE';
const SWITCH_ROLES = 'SWITCH_ROLES';

export const ROLE_USER = ['USER', 'Пользователь'];
export const ROLE_CLIENT = ['CLIENT', 'Клиент'];
export const ROLE_COURIER = ['COURIER', 'Курьер'];
export const ROLES = [ROLE_CLIENT, ROLE_COURIER];

let setCurrentUser = (params) => {
    if (params == null) {
        return {
            user: {
                id: null,
                username: null,
                roles: null,
                firstName: null,
                lastName: null,
                email: null,
                phoneNumber: null,
                account: null
            },
            username: null,
            roles: null,
            isAuth: false
        }
    } else {
        return {
            user: {
                id: params.id,
                username: params.username,
                roles: params.roles,
                firstName: params.firstName,
                lastName: params.lastName,
                email: params.email,
                phoneNumber: params.phoneNumber,
                account: params.account
            },
            username: params.username,
            isAuth: true
        }
    }
};

let initialState = setCurrentUser(null);


const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            return {
                ...state,
                ...action.payload,
            };
        case SET_USER_ROLE_TO_STATE:
            return {
                ...state,
                ...action.payload,
            };
        case SWITCH_ROLES:
            let stateCopy = {...state};
            stateCopy.user = {...state.user};
            stateCopy.user.roles = action.payload;
            return stateCopy;
        default:
            return state;
    }
};

export const registration = (username, password, firstName, lastName, email, phoneNumber) => async () => {

    try {
        let id = await requestHandler('authAPI.register',
            {username, password, firstName, lastName, email, phoneNumber});
        await findResponseById(id);
        alert('Вы успешно зарегистрировались. Используется логин и пароль для входа в систему');
    } catch (error) {
        alert(error);
    }
};

export const login = (login, password) => async (dispatch) => {
    let getTokensResponseId = await requestHandler('authAPI.getTokens', {login, password});
    let getTokensResponse = await findResponseById(getTokensResponseId);
    if (getTokensResponse != null) {
        let accessToken = getTokensResponse.data.accessToken;
        let refreshToken = getTokensResponse.data.refreshToken;
        //todo find how to validate JWT
        await setLocalAccessToken(accessToken);
        await setLocalRefreshToken(refreshToken);
        dispatch(getAuthUserData());
    }
};

export const logout = () => async (dispatch) => {
    await removeLocalAccessToken();
    await removeLocalRefreshToken();
    await removeLocalRoles();
    await removeLocalParams();
    let emptyUser = setCurrentUser(null);
    dispatch(setAuthUserData(emptyUser));
};

export const getAuthUserData = () => async (dispatch) => {
    let accessToken = await getLocalAccessToken();
    if (accessToken != null) {
        let decodeAccessToken = await getDecodeJWT(accessToken);
        if (decodeAccessToken.exp > (Date.now() / 1000)) {
            console.log('access token is ok');
            let currentLocalUser = await setUserFromServer(accessToken);
            dispatch(setAuthUserData(currentLocalUser));
        }
    } else {
        dispatch(setAuthUserData(null));
        let refreshToken = await getLocalRefreshToken();
        if (refreshToken != null) {
            let decodeRefreshToken = await getDecodeJWT(refreshToken);
            if (decodeRefreshToken.exp > (Date.now() / 1000)) {
                console.log('refreshTokens token is ok');
                let refreshToken = await getLocalRefreshToken();
                let id = await requestHandler('authAPI.refreshTokens', {refreshToken});
                await refreshTokens(id);
                let localAccessToken = await getLocalAccessToken();
                let currentLocalUser = await setUserFromServer(localAccessToken);
                dispatch(setAuthUserData(currentLocalUser));
            }
        }
    }
};

const requestHandler = (method, params) => {
    return new Promise(resolve => {
        resolve(api_wrapper(method, params));
    });
};

const refreshTokens = async (id) => {
    let response = findResponseById(id);
    await setLocalAccessToken(response.data.accessToken);
    await setLocalRefreshToken(response.data.refreshToken);
};

export const setUserRole = (role) => async (dispatch) => {
    debugger
    let accessToken = await getLocalAccessToken();
    let id;
    if (role === ROLE_CLIENT[0]) {
        id = await api_wrapper('usersAPI.makeClient', accessToken);

    } else if (role === ROLE_COURIER[0]) {
        id = await api_wrapper('usersAPI.makeCourier', accessToken);
    }
    let response = findResponseById(id);
    if (response != null) {
        dispatch(getAuthUserData())
    }
};

export const setAuthUserData = (payload) => ({
    type: SET_USER_DATA, payload: payload
});

export const switchRolesInState = (roles) => async(dispatch) => {
    dispatch(switchRoles(roles));
};

const switchRoles = (roles) => ({
    type: SWITCH_ROLES, payload: roles
});


const setUserFromServer = async (accessToken) => {
    let getCurrentUserResponseId = await api_wrapper('usersAPI.getCurrentUser', accessToken);
    let currentUserResponse = await findResponseById(getCurrentUserResponseId);
    if (currentUserResponse != null) {
        let currentUser = currentUserResponse.data.result;
        let rolesWithoutUser =[];
        let rolesFromServer = currentUser.roles;
        for (let i = 0; i < rolesFromServer.length; i++) {
            if (rolesFromServer[i]!==ROLE_USER[0]) {
                rolesWithoutUser.push(rolesFromServer[i])
            }
        }
        let totalRoles = await chooseRole(rolesWithoutUser);
        await setUserRoleInStorage(totalRoles);
        let updatedUser = {...currentUser} ;
        updatedUser.roles = totalRoles;
        return setCurrentUser(updatedUser);
    }
};

const chooseRole = async (rolesFromServer) => {
    debugger
    let localRoles = await getUserRoleFromStorage();
    if (localRoles!=null && localRoles.length === 0) {
        if (rolesFromServer.length> localRoles.length) {
            return rolesFromServer;
        } else {
            return localRoles;
        }
    } else {
        return rolesFromServer;
    }
};


export default authReducer;