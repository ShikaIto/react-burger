import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR
} from '../actions/socket';
import { TOrder } from '../../utils/types';
import { TSocketActions } from '../types/socket';

type TSocketState = {
  wsConnected: boolean,
  error: undefined | string,
  wsConnectedAuth: boolean,
  orders: [] | TOrder[],
  total: number,
  totalToday: number
}

const initialState: TSocketState = {
  wsConnected: false,
  error: undefined,

  wsConnectedAuth: false,

  orders: [],
  total: 0,
  totalToday: 0
};

export const wsReducer = (state = initialState, action: TSocketActions): TSocketState => {
  switch (action.type) {
    case WS_AUTH_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnectedAuth: true,
      };

    case WS_AUTH_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnectedAuth: false
      };

    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        error: undefined,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        error: action.payload,
        wsConnected: false
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        error: undefined,
        wsConnected: false
      };

    case WS_GET_MESSAGE:
      return {
        ...state,
        error: undefined,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday
      };
    default:
      return state;
  }
}