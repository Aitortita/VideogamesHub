import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import videogamesReducer from "../videogamesSlice/videogamesSlice";

const reducer = combineReducers({
    // reducers to combine
    videogames: videogamesReducer
})


const store = configureStore({
    reducer,
})

export default store;