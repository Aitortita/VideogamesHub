import { SEARCH_VIDEOGAME, GET_ALL_VIDEOGAMES, GET_VIDEOGAME, UNVIDEOGAME, UNFILTERVIDEOGAMES, CLEAR, CREATE_VIDEOGAME, GET_EXACT_VIDEOGAME, CLEAN_EXACT_VIDEOGAME, GET_ALL_GENRES_AND_PLATFORMS} from "../ActionNames/ActionNames";


const initialState = {
    videogames: [],
    videogamesFilter: [],
    videogame: {},
    exactVideogame: {},
    genres: [],
    platforms: [],
    videogamesSearch: "",
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_VIDEOGAMES:
            return {...state, videogames: action.payload}
        case SEARCH_VIDEOGAME:
            return {...state, videogamesFilter: action.payload, videogamesSearch: action.payloadName}
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
        case GET_EXACT_VIDEOGAME:
            return {...state, exactVideogame: action.payload}
        case CLEAN_EXACT_VIDEOGAME:
            return {...state, exactVideogame: null}
        case GET_ALL_GENRES_AND_PLATFORMS:
            return {...state, genres: action.payloadGenres, platforms: action.payloadPlatforms}
        
        default: return state
    }
};

export default rootReducer;