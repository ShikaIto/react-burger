import { combineReducers } from "redux";
import  { main } from './main.js';
import { profile } from "./profile.js";
import { wsReducer } from "./socket.js";


export const rootReducer = combineReducers({
    main: main,
    profile: profile,
    socket: wsReducer
});