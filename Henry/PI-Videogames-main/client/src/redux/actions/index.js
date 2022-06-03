import {SEARCH_VIDEOGAME, GET_ALL_VIDEOGAMES, GET_VIDEOGAME, UNVIDEOGAME, UNSEARCHVIDEOGAMES, 
        GET_EXACT_VIDEOGAME, CLEAN_EXACT_VIDEOGAME, GET_ALL_GENRES_AND_PLATFORMS, FILTER, UNFILTER,
        SORT, UNSORT, SORTING, MORE_PAGINATION, LESS_PAGINATION, RESET_PAGINATION, CHANGE_API_FILTER,
        CREATE_VIDEOGAME, CLEAR_FILTERS } from "../ActionNames/ActionNames.js";
import axios from "axios";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

export const getAllVideogames = (apifilter) => {
    return async function (dispatch) {
      try {
        if(apifilter === "rawg") {
          const {data} = await axios.get('/videogamesRawg');
          shuffle(data)
          return await dispatch({type: GET_ALL_VIDEOGAMES, payload: data})
        }
        if (apifilter === "videogamesHUB") {
          const {data} = await axios.get('/videogamesHUB');
          shuffle(data)
          return await dispatch({type: GET_ALL_VIDEOGAMES, payload: data})
        }
        const {data} = await axios.get('/videogames');
        shuffle(data)
        dispatch({type: GET_ALL_VIDEOGAMES, payload: data})
      } catch (err) {
        console.log(err.message)
      }
    }
}

export const createVideogame = ({name, description, launchDate, rating, platform, image, genre}) => {
  return (dispatch) => {
    if (!name|| !description || !platform ||!genre) return console.log("invalid parameters");
    axios.post('/videogame', {
      name,
      description,
      launchDate,
      rating,
      platform,
      image,
      genre
    })
    .then(({data})=> dispatch({type: CREATE_VIDEOGAME}))
    .catch(err => console.log(err.message))
  }
}

export const searchVideogame = (apifilter, name, sort, sorting) => {
  return async function (dispatch) {
    try {
      if(apifilter === "rawg") {
        const {data} = await axios.get(`/videogamesRawg`, {params: {name, sort, sorting}});
        return await dispatch({type: SEARCH_VIDEOGAME, payload: data, payloadName: name, payloadSort: sort})
      }
      if (apifilter === "videogamesHUB") {
        const {data} = await axios.get(`/videogamesHUB`, {params: {name, sort, sorting}});
        return await dispatch({type: SEARCH_VIDEOGAME, payload: data, payloadName: name, payloadSort: sort})
      }
      const {data} = await axios.get(`/videogames`, {params: {name, sort, sorting}});
      dispatch({type: SEARCH_VIDEOGAME, payload: data, payloadName: name, payloadSort: sort})
    } catch (err) {
      dispatch({type: SEARCH_VIDEOGAME, payloadName: name, payload: []})
      console.log(err.message)
    }
  }
}

export const getVideogame = (id) => {
  return async function (dispatch) {
    try {
      const {data} = await axios.get(`/videogames/${id}`)   
      dispatch({type: GET_VIDEOGAME, payload: data})   
    } catch (err) {
      console.log(err.message)
    }
  }
}

export const unVideogame = () => {
  return (dispatch) => {
    dispatch({type: UNVIDEOGAME})
  }
}
  
export const unSearchVideogames = () => {
  return (dispatch) => {
    dispatch({type: UNSEARCHVIDEOGAMES})
  }
}

export const getExactVideogame = (name) => {
  return (dispatch) => {
    axios.get('/videogame', {params : {name}})
    .then(resp => dispatch({type: GET_EXACT_VIDEOGAME, payload: resp.data}))
    .catch(err => console.log(err.message))
  }
}

export const cleanExactVideogame = () => {
  return (dispatch) => {
    dispatch({type: CLEAN_EXACT_VIDEOGAME})
  }
}

export const getAllGenresAndPlatforms = () => {
  return (dispatch) => {
    Promise.all([axios.get('/genres'), axios.get('/platforms')])
    .then(resp=> dispatch({type: GET_ALL_GENRES_AND_PLATFORMS, payloadGenres: resp[0].data, payloadPlatforms: resp[1].data}))
    .catch(err => console.log(err.message))
  }
}

export const filter = (filter) => {
 return (dispatch) => {
   dispatch({type: FILTER, payload: filter})
 }
}

export const unFilter = () => {
  return (dispatch) => {
    dispatch({type: UNFILTER})
  }
}

export const sort = (apifilter, sort, sorting) => {
  return (dispatch) => {
    if(apifilter === "rawg") {
      axios.get('/videogamesRawg', {params: {sort, sorting}})
      .then(({data}) => dispatch({type:SORT, payload: data, payloadSort: sort}))
      return
    }
    if (apifilter === "videogamesHUB") {
      axios.get('/videogamesHUB', {params: {sort, sorting}})
      .then(({data}) => dispatch({type:SORT, payload: data, payloadSort: sort}))
      return
    }
    axios.get('/videogames', {params: {sort, sorting}})
    .then(({data}) => dispatch({type:SORT, payload: data, payloadSort: sort}))
  }
}

 export const unSort = () => {
   return (dispatch) => {
     dispatch({type: UNSORT})
   }
 }

 export const sorting = (sorting) => {
   return (dispatch) => {
     dispatch({type: SORTING, payload: sorting})
   }
 }

 export const morePagination = () => {
   return (dispatch) => {
     dispatch({type: MORE_PAGINATION})
   }
 }
 
 export const lessPagination = () => {
   return (dispatch) => {
     dispatch({type: LESS_PAGINATION})
   }
 }
 
 export const resetPagination = () => {
   return (dispatch) => {
     dispatch({type: RESET_PAGINATION})
   }
 }

 export const changeApiFilter = (filter) => {
   return (dispatch) => {
     dispatch({type: CHANGE_API_FILTER, payload: filter})
   }
 }

 export const clearFilters = () => {
   return (dispatch) => {
     dispatch({type: CLEAR_FILTERS})
   }
 }