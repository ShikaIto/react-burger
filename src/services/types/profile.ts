import {
    LOGIN, LOGIN_FAILED, LOGIN_SUCCESS, LOGOUT, LOGOUT_FAILED,
    LOGOUT_SUCCESS, FORGOT_PASSWORD_SUCCESS, RESET_PASSWORD_SUCCESS,
    GET_USER, GET_USER_FAILED, GET_USER_SUCCESS, UPDETE_USER, UPDETE_USER_FAILED,
    UPDETE_USER_SUCCESS
} from "../actions/profile";

import { TUser } from "../../utils/types";

export interface ILogin {
    readonly type: typeof LOGIN
}

export interface ILoginFailed {
    readonly type: typeof LOGIN_FAILED
}

export interface ILoginSuccess {
    readonly type: typeof LOGIN_SUCCESS,
    readonly user: TUser
}

export interface ILogout {
    readonly type: typeof LOGOUT
}

export interface ILogoutFailed {
    readonly type: typeof LOGOUT_FAILED
}

export interface ILogoutSuccess {
    readonly type: typeof LOGOUT_SUCCESS
}

export interface IForgotPasswordSuccess {
    readonly type: typeof FORGOT_PASSWORD_SUCCESS
}

export interface IResetPasswordSuccess {
    readonly type: typeof RESET_PASSWORD_SUCCESS
}

export interface IGetUser {
    readonly type: typeof GET_USER
}

export interface IGetUserFailed {
    readonly type: typeof GET_USER_FAILED
}

export interface IGetUserSuccess {
    readonly type: typeof GET_USER_SUCCESS,
    readonly user: TUser
}

export interface IUpdeteUser {
    readonly type: typeof UPDETE_USER
}

export interface IUpdeteUserFailed {
    readonly type: typeof UPDETE_USER_FAILED
}

export interface IUpdeteUserSuccess {
    readonly type: typeof UPDETE_USER_SUCCESS,
    readonly user: TUser
}

export type TProfileActions =
    | ILogin
    | ILoginFailed
    | ILoginSuccess
    | ILogout
    | ILogoutFailed
    | ILogoutSuccess
    | IForgotPasswordSuccess
    | IResetPasswordSuccess
    | IGetUser
    | IGetUserFailed
    | IGetUserSuccess
    | IUpdeteUser
    | IUpdeteUserFailed
    | IUpdeteUserSuccess