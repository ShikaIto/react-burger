import {
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE,
    WS_AUTH_CONNECTION_SUCCESS,
    WS_AUTH_CONNECTION_ERROR,
    WS_AUTH_CONNECTION_CLOSED,
    WS_AUTH_CONNECTION_START,
    WS_CONNECTION_START,
    WS_SEND_MESSAGE
} from '../actions/socket';
import { TOrder } from '../../utils/types'

type TMassage = {
    orders: TOrder[],
    total: number,
    totalToday: number
}

export interface IWsConnectionSuccess {
    readonly type: typeof WS_CONNECTION_SUCCESS
}

export interface IWsConnectionError {
    readonly type: typeof WS_CONNECTION_ERROR,
    readonly payload: string
}

export interface IWsConnectionClosed {
    readonly type: typeof WS_CONNECTION_CLOSED
}

export interface IWsGetMessage {
    readonly type: typeof WS_GET_MESSAGE,
    readonly payload: any
}

export interface IWsAuthConnectionSuccess {
    readonly type: typeof WS_AUTH_CONNECTION_SUCCESS
}

export interface IWsAuthConnectionError {
    readonly type: typeof WS_AUTH_CONNECTION_ERROR,
    readonly payload: string
}

export interface IWsAuthConnectionStart {
    readonly type: typeof WS_AUTH_CONNECTION_START
}

export interface IWsAuthConnectionClosed {
    readonly type: typeof WS_AUTH_CONNECTION_CLOSED
}

export interface IWsConnectionStart {
    readonly type: typeof WS_CONNECTION_START
}

export interface IWsSendMessage {
    readonly type: typeof WS_SEND_MESSAGE
}

export type TSocketActions =
    | IWsConnectionClosed
    | IWsConnectionError
    | IWsConnectionSuccess
    | IWsGetMessage
    | IWsSendMessage
    | IWsConnectionStart
    | IWsAuthConnectionClosed
    | IWsAuthConnectionError
    | IWsAuthConnectionStart
    | IWsAuthConnectionSuccess