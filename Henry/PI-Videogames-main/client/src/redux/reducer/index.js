import { FILTER_VIDEOGAME, GET_ALL_VIDEOGAMES, GET_VIDEOGAME, UNVIDEOGAME, UNFILTERVIDEOGAMES, CLEAR, CREATE_VIDEOGAME} from "../ActionNames/ActionNames";


const initialState = {
    videogames: [],
    videogamesFilter: [],
    videogame: {},
    videogameCreated: false,
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
        case CLEAR:
            return {...state, videogamesFilter: [], videogame: {}, videogameCreated: false}
        case CREATE_VIDEOGAME:
            return {...state, videogameCreated: true}
        
        default: return state
    }
};

export default rootReducer;