import { combineReducers } from "redux";
import  { main } from './main.js';
import { profile } from "./profile.js";


export const rootReducer = combineReducers({
    main: main,
    profile: profile
});