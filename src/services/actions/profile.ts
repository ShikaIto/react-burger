import { api } from "../../utils/constants";
import { checkResponse } from "./main";
import { getCookie } from "../../utils/utils";
import { AppDispatch, AppThunk } from "../store";

export const LOGIN: 'LOGIN' = 'LOGIN';
export const LOGIN_SUCCESS: 'LOGIN_SUCCESS' = 'LOGIN_SUCCESS';
export const LOGIN_FAILED: 'LOGIN_FAILED' = 'LOGIN_FAILED';

export const LOGOUT: 'LOGOUT' = 'LOGOUT';
export const LOGOUT_SUCCESS: 'LOGOUT_SUCCESS' = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILED: 'LOGOUT_FAILED' = 'LOGOUT_FAILED';

export const RESET_PASSWORD_SUCCESS: 'RESET_PASSWORD_SUCCESS' = 'RESET_PASSWORD_SUCCESS';
export const FORGOT_PASSWORD_SUCCESS: 'FORGOT_PASSWORD_SUCCESS' = 'FORGOT_PASSWORD_SUCCESS';

export const GET_USER: 'GET_USER' = 'GET_USER';
export const GET_USER_SUCCESS: 'GET_USER_SUCCESS' = 'GET_USER_SUCCESS';
export const GET_USER_FAILED: 'GET_USER_FAILED' = 'GET_USER_FAILED';

export const UPDETE_USER: 'UPDETE_USER' = 'UPDETE_USER';
export const UPDETE_USER_SUCCESS: 'UPDETE_USER_SUCCESS' = 'UPDETE_USER_SUCCESS';
export const UPDETE_USER_FAILED: 'UPDETE_USER_FAILED' = 'UPDETE_USER_FAILED';

export const login: AppThunk = (items, url) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: LOGIN })

    fetch(`${api}auth/${url}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(items)
    })
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch({ type: LOGIN_SUCCESS, user: res.user });
          localStorage.setItem('token', res.refreshToken);
          document.cookie = `token=${res.accessToken}`;
        } else {
          dispatch({ type: LOGIN_FAILED });
        }
      })
      .catch(err => {
        dispatch({ type: LOGIN_FAILED });
      })
  }
}

export const logout: AppThunk = (token) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: LOGOUT })

    fetch(`${api}auth/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    })
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch({ type: LOGOUT_SUCCESS });
          localStorage.removeItem('token');
          document.cookie = `token=; max-age=-1`;
        } else {
          dispatch({ type: LOGOUT_FAILED });
        }
      })
      .catch(err => {
        dispatch({ type: LOGOUT_FAILED });
      })
  }
}

export const forgotPassword: AppThunk = (items) => {
  return function (dispatch: AppDispatch) {
    fetch(`${api}password-reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(items)
    })
      .then(checkResponse)
      .then(res => {
        dispatch({ type: FORGOT_PASSWORD_SUCCESS });
      })
      .catch(err => {
        console.log(err);
      })
  }
}


export const resetPassword: AppThunk = (items) => {
  return function (dispatch: AppDispatch) {
    fetch(`${api}password-reset/reset`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(items)
    })
      .then(checkResponse)
      .then(res => {
        dispatch({ type: RESET_PASSWORD_SUCCESS });
      })
      .catch(err => {
        console.log(err);
      })
  }
}

export const updateToken: AppThunk = (func, items) => {
  return function (dispatch: AppDispatch) {
    console.log('обновляется!');
    const token = localStorage.getItem('token');
    fetch(`${api}auth/token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ token })
    })
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          localStorage.setItem('token', res.refreshToken);
          document.cookie = `token=${res.accessToken}`;
          dispatch(func(items));
        }
      })
      .catch(err => {
        console.log(err);
      })
  }
}


export const getUser: AppThunk = () => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: GET_USER });

    fetch(`${api}auth/user`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization: getCookie('token')
      } as HeadersInit,
    })
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch({ type: GET_USER_SUCCESS, user: res.user });
        } else {
          dispatch({ type: GET_USER_FAILED });
        }
      })
      .catch(err => {
        if (err.message === 'jwt expired') {
          dispatch(updateToken(getUser));
        }
        dispatch({ type: GET_USER_FAILED });
      })
  }
}

export const updateUser: AppThunk = (items) => {
  return function (dispatch: AppDispatch) {
    dispatch({ type: UPDETE_USER });

    fetch(`${api}auth/user`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        authorization: getCookie('token')
      } as HeadersInit,
      body: JSON.stringify(items)
    })
      .then(checkResponse)
      .then(res => {
        if (res && res.success) {
          dispatch({ type: UPDETE_USER_SUCCESS, user: res.user });
        } else {
          dispatch({ type: UPDETE_USER_FAILED });
        }
      })
      .catch(err => {
        if (err.message === 'jwt expired') {
          dispatch(updateToken(updateUser, items));
        }
        dispatch({ type: UPDETE_USER_FAILED });
      })
  }
}


