import { FILTER_VIDEOGAME, GET_ALL_VIDEOGAMES } from "./ActionNames.js";
import axios from "axios";

export const getAllVideogames = () => {
    return async function (dispatch) {
      try {
        const resp = await axios.get('http://localhost:3001/videogames');
        dispatch({type: GET_ALL_VIDEOGAMES, payload: resp.data})
      } catch (err) {
        console.log(err.message)
      } 
    };
};

// promises method
// export const getAllVideogames = () => {
//   return function (dispatch) {
//       return axios.get('http://localhost:3001/videogames')
//       .then(resp =>dispatch({type: GET_ALL_VIDEOGAMES, payload: resp.data}))
//       .catch(err => console.log(err.message))
//   };
// };


export const filterVideogame = (name) => {
  return async function (dispatch) {
    try {
      const resp = await axios.get('http://localhost:3001/videogames', {params: {name}});
      dispatch({type: FILTER_VIDEOGAME, payload: resp.data})
    } catch (err) {
      dispatch({type: FILTER_VIDEOGAME, payload: []})
      console.log(err.message)
    }
  }
}

