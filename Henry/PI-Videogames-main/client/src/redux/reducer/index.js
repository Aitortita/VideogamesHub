import {SEARCH_VIDEOGAME, GET_ALL_VIDEOGAMES, GET_VIDEOGAME, UNVIDEOGAME, UNSEARCHVIDEOGAMES,
        CREATE_VIDEOGAME, GET_EXACT_VIDEOGAME, CLEAN_EXACT_VIDEOGAME, GET_ALL_GENRES_AND_PLATFORMS,
        FILTER, UNFILTER, SORT, UNSORT, SORTING, MORE_PAGINATION, RESET_PAGINATION, LESS_PAGINATION,
        CHANGE_API_FILTER, CLEAR_FILTERS} from "../ActionNames/ActionNames";

const initialState = {
    videogames: [],
    videogamesSearch: [],
    videogamesSearchName: "",
    videogame: {},
    videogameCreated: false,
    exactVideogame: "",
    genres: [],
    platforms: [],
    filter: "",
    sort: "",
    sorting: "DESC",
    pagination: 15,
    apiFilter: "",
};

const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case GET_ALL_VIDEOGAMES:
            return {...state, videogames: action.payload}
        case SEARCH_VIDEOGAME:
            return {...state, videogamesSearch: action.payload, videogamesSearchName: action.payloadName}
        case GET_VIDEOGAME:
            return {...state, videogame: action.payload}
        case UNVIDEOGAME:
            return {...state, videogame: {}}
        case UNSEARCHVIDEOGAMES:
            return {...state, videogamesSearch: [], videogamesSearchName: ""}
        case CREATE_VIDEOGAME:
            return {...state, videogameCreated: true}
        case GET_EXACT_VIDEOGAME:
            return {...state, exactVideogame: action.payload}
        case CLEAN_EXACT_VIDEOGAME:
            return {...state, exactVideogame: ""}
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
        case CHANGE_API_FILTER:
            return {...state, apiFilter: action.payload}
        case CLEAR_FILTERS:
            return {...state, apiFilter: "", filter: "", sort: ""}
        default: return state
    }
};

export default rootReducer;