import { rootReducer } from './reducers/rootReducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { wsActions, wsActionsAuth } from './actions/socket';
import { socketMiddleware } from './middleware/socketMiddleware';
import { composeWithDevTools } from 'redux-devtools-extension';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TMainActions } from './types/main';
import { TProfileActions } from './types/profile';
import { TSocketActions } from './types/socket';
import { ActionCreator } from 'redux';

const wsUrl: string = 'wss://norma.nomoreparties.space/orders';

const enhancer = composeWithDevTools(applyMiddleware(
  thunk,
  socketMiddleware(wsUrl, wsActions),
  socketMiddleware(wsUrl, wsActionsAuth)
));

export const store = createStore(rootReducer, enhancer);

export type RootState = ReturnType<typeof store.getState>;

export type TApplicationActions = TMainActions | TProfileActions | TSocketActions;

export type AppThunk<ReturnType = void> = ActionCreator<ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TApplicationActions
>>;

export type AppDispatch = ThunkDispatch<RootState, never, TApplicationActions> | ActionCreator<void>;