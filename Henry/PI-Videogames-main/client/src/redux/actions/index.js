import { SEARCH_VIDEOGAME, GET_ALL_VIDEOGAMES, GET_VIDEOGAME, UNVIDEOGAME, UNFILTERVIDEOGAMES, CLEAR, GET_EXACT_VIDEOGAME, CLEAN_EXACT_VIDEOGAME, GET_ALL_GENRES_AND_PLATFORMS, FILTER, UNFILTER, SORT, UNSORT, SORTING, MORE_PAGINATION, LESS_PAGINATION, RESET_PAGINATION } from "../ActionNames/ActionNames.js";
import axios from "axios";

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
  }
}

export const getAllVideogames = () => {
    return async function (dispatch) {
      try {
        const resp = await axios.get('http://localhost:3001/videogames');
        shuffle(resp.data)
        dispatch({type: GET_ALL_VIDEOGAMES, payload: resp.data})
      } catch (err) {
        console.log(err.message)
      } 
    }
}

export const createVideogame = ({name, description, launchDate, rating, platform, image, genre}) => {
  return (dispatch) => {
    if (!name|| !description || !platform ||!genre) return console.log("invalid parameters");
    axios.post('http://localhost:3001/videogame', {
      name,
      description,
      launchDate,
      rating,
      platform,
      image,
      genre
    })
    .then((resp)=> console.log(resp.data))
    .catch(err => console.log(err.message))
  }
}

export const searchVideogame = (name) => {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`http://localhost:3001/videogames`, {params: {name}});
      dispatch({type: SEARCH_VIDEOGAME, payload: resp.data, payloadName: name})
    } catch (err) {
      dispatch({type: SEARCH_VIDEOGAME, payload: []})
      console.log(err.message)
    }
  }
}

export const getVideogame = (id) => {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`http://localhost:3001/videogames/${id}`)   
      dispatch({type: GET_VIDEOGAME, payload: resp.data})   
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

export const unFilterVideogames = () => {
  return (dispatch) => {
    dispatch({type: UNFILTERVIDEOGAMES})
  }
}

export const clear = () => {
  return (dispatch) => {
    dispatch({type: CLEAR})
  }
}

export const getExactVideogame = (name) => {
  return (dispatch) => {
    axios.get('http://localhost:3001/videogame', {params : {name}})
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
    Promise.all([axios.get('http://localhost:3001/genres'), axios.get('http://localhost:3001/platforms')])
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

 export const sort = (sort, sorting) => {
   return (dispatch) => {
     axios.get('http://localhost:3001/videogames', {params: {sort, sorting}})
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