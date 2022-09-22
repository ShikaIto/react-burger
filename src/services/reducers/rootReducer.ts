import { combineReducers } from "redux";
import  { main } from './main';
import { profile } from "./profile";
import { wsReducer } from "./socket";


export const rootReducer = combineReducers({
    main: main,
    profile: profile,
    socket: wsReducer
});