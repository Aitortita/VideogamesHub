import { SEARCH_VIDEOGAME, GET_ALL_VIDEOGAMES, GET_VIDEOGAME, UNVIDEOGAME, UNFILTERVIDEOGAMES, CLEAR, CREATE_VIDEOGAME, GET_EXACT_VIDEOGAME, CLEAN_EXACT_VIDEOGAME, GET_ALL_GENRES_AND_PLATFORMS, FILTER, UNFILTER, SORT, UNSORT, SORTING, MORE_PAGINATION, RESET_PAGINATION, LESS_PAGINATION, MOUNT_OBJECTS} from "../ActionNames/ActionNames";


const initialState = {
    videogames: [],
    searchVideogames: [],
    videogamesSearchName: "",
    videogame: {},
    exactVideogame: "",
    genres: [],
    platforms: [],
    filter: "",
    sort: "",
    sorting: "desc",
    pagination: 15,
    genresObj: {},
    platformsObj: {}
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_VIDEOGAMES:
            return {...state, videogames: action.payload}
        case SEARCH_VIDEOGAME:
            return {...state, searchVideogames: action.payload, videogamesSearchName: action.payloadName}
        case GET_VIDEOGAME:
            return {...state, videogame: action.payload}
        case UNVIDEOGAME:
            return {...state, videogame: {}}
        case UNFILTERVIDEOGAMES:
            return {...state, searchVideogames: [], videogamesSearchName: ""}
        case CLEAR:
            return {...state, searchVideogames: [], videogame: {}, videogameCreated: false, videogamesSearchName: "", filter: ""}
        case CREATE_VIDEOGAME:
            return {...state, videogameCreated: true}
        case GET_EXACT_VIDEOGAME:
            return {...state, exactVideogame: action.payload}
        case CLEAN_EXACT_VIDEOGAME:
            return {...state, exactVideogame: null}
        case GET_ALL_GENRES_AND_PLATFORMS:
            return {...state, genres: action.payloadGenres, platforms: action.payloadPlatforms}
        case FILTER:
            return {...state, filter: action.payload}
        case UNFILTER:
            return {...state, filter: ""}
        case SORT:
            return {...state, videogames: action.payload, sort: action.payloadSort}
        case UNSORT:
            return {...state, sort: ""}
        case SORTING:
            return {...state, sorting: action.payload}
        case MORE_PAGINATION:
            return {...state, pagination: state.pagination + 15}
        case LESS_PAGINATION:
            return {...state, pagination: state.pagination - 15}
        case RESET_PAGINATION:
            return {...state, pagination: 15}
        case MOUNT_OBJECTS:
            return {...state}
        default: return state
    }
};

export default rootReducer;