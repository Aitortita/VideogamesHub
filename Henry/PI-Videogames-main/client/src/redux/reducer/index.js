import { FILTER_VIDEOGAME, GET_ALL_VIDEOGAMES, GET_VIDEOGAME } from "../actions/ActionNames";


const initialState = {
    videogames: [],
    videogamesFilter: [],
    videogame: {}
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_VIDEOGAMES:
            return {...state, videogames: action.payload}
        case FILTER_VIDEOGAME:
            console.log("estoy buscando...")
            return {...state, videogamesFilter: action.payload}
        case GET_VIDEOGAME:
            return {...state, videogame: action.payload}
        
        default: return state
    }
};

export default rootReducer;