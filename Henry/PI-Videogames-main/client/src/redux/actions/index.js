import { FILTER_VIDEOGAME, GET_ALL_VIDEOGAMES, GET_VIDEOGAME, UNVIDEOGAME, UNFILTERVIDEOGAMES, CLEAR } from "../ActionNames/ActionNames.js";
import axios from "axios";

export const getAllVideogames = () => {
    return async function (dispatch) {
      try {
        const resp = await axios.get('http://localhost:3001/videogames');
        dispatch({type: GET_ALL_VIDEOGAMES, payload: resp.data})
      } catch (err) {
        console.log(err.message)
      } 
    }
}

export const createVideogame = ({id, name, description, launchDate, rating, platform, image}) => {
  return (dispatch) => {
    if (!id || !name|| !description || !platform) return console.log("invalid parameters");
    axios.post('http://localhost:3001/videogame', {
      id,
      name,
      description,
      launchDate,
      rating,
      platform,
      image
    })
    .then((resp)=> console.log(resp))
    .catch(err => console.log(err.message))
  }
}

export const filterVideogame = (name) => {
  return async function (dispatch) {
    try {
      const resp = await axios.get(`http://localhost:3001/videogames`, {params: {name}});
      dispatch({type: FILTER_VIDEOGAME, payload: resp.data})
    } catch (err) {
      dispatch({type: FILTER_VIDEOGAME, payload: []})
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

