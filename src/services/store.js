import { rootReducer } from './reducers/rootReducer.js';
import { compose, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_AUTH_CONNECTION_START,
  WS_AUTH_CONNECTION_CLOSED,
  WS_AUTH_CONNECTION_SUCCESS,
  WS_AUTH_CONNECTION_ERROR
} from './actions/socket.js';
import { socketMiddleware } from './middleware/socketMiddleware.js';
import { getCookie } from '../utils/utils.js';

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsUrlAuth = `wss://norma.nomoreparties.space/orders?token=${getCookie('token').slice(7)}`;

const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
}

const wsActionsAuth = {
  wsInit: WS_AUTH_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_AUTH_CONNECTION_SUCCESS,
  onClose: WS_AUTH_CONNECTION_CLOSED,
  onError: WS_AUTH_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(
    thunk, 
    socketMiddleware(wsUrl, wsActions), 
    socketMiddleware(wsUrlAuth, wsActionsAuth)
    ));

export const store = createStore(rootReducer, enhancer);