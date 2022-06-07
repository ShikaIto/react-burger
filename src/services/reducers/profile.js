import { LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT, LOGOUT_FAILED,
LOGOUT_SUCCESS, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_SUCCESS,
GET_USER, GET_USER_FAILED, GET_USER_SUCCESS, UPDETE_USER, UPDETE_USER_FAILED,
UPDETE_USER_SUCCESS } from "../actions/profile.js";

const initialState = {
    user: {},
    auth: false,

    forgot: false,
    reset: false,

    loginRequest: false,
    loginFailed: false,

    logoutRequest: false,
    logoutFailed: false,

    userRequest: false,
    userFailed: false
}

export const profile = (state = initialState, action) => {
    switch(action.type) {
        case LOGIN: {return {...state, loginRequest: true, loginFailed: false}}
        case LOGIN_SUCCESS: {
            return {...state,
                loginRequest: false, 
                user: action.user,
                auth: true,
                reset: false}
        }
        case LOGIN_FAILED: {return {...state, loginRequest: false, loginFailed: true}}

        case LOGOUT: {return {...state, logoutRequest: true, logoutFailed: false}}
        case LOGOUT_SUCCESS: {
            return {...state,
                loginRequest: false,
                user: {},
                token: '',
                auth: false}
        }
        case LOGOUT_FAILED: {return {...state, logoutRequest: false, logoutFailed: true}}

        case RESET_PASSWORD_SUCCESS: {return {...state, forgot: false, reset: true}}
        case FORGOT_PASSWORD_SUCCESS: {return {...state, forgot: true}}
        
        case GET_USER || UPDETE_USER: {return {...state, userRequest: true, userFailed: false}}
        case GET_USER_SUCCESS || UPDETE_USER_SUCCESS: {
            return {...state,
                userRequest: false, 
                user: action.user,
                auth: true}
        }
        case GET_USER_FAILED || UPDETE_USER_FAILED: {return {...state, userRequest: false, userFailed: true}}

        default: {
            return state;
        }
    }
}