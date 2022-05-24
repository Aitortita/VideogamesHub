import { FILTER_VIDEOGAME, GET_ALL_VIDEOGAMES, GET_VIDEOGAME, UNVIDEOGAME, UNFILTERVIDEOGAMES} from "../ActionNames/ActionNames";


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
            return {...state, videogamesFilter: action.payload}
        case GET_VIDEOGAME:
            return {...state, videogame: action.payload}
        case UNVIDEOGAME:
            return {...state, videogame: {}}
        case UNFILTERVIDEOGAMES:
            return {...state, videogamesFilter: []}
        
        default: return state
    }
};

export default rootReducer;