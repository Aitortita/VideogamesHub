import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
  }
}

export const getAllVideogames = createAsyncThunk("videogames/getAllVideogames",
    async (apifilter) => {
        if(apifilter === "rawg") {
          const {data} = await axios.get('/videogamesRawg');
          shuffle(data)
          return data
        }
        if (apifilter === "videogamesHUB") {
          const {data} = await axios.get('/videogamesHUB');
          shuffle(data)
          return data
        }
        const {data} = await axios.get('/videogames');
        shuffle(data)
        return data
    })

export const createVideogame = createAsyncThunk("videogames/createVideogame",
    async (body) => {
        const {data} = await axios.post('/videogame', body)
        return data
    })
    
export const searchVideogame = createAsyncThunk("videogames/searchVideogame", 
    async (args) => {
        const {apifilter, name, sort, sorting} = args
        if(apifilter === "rawg") {
            const {data} = await axios.get(`/videogamesRawg`, {params: {name, sort, sorting}})
            return {payload: data, payloadName: name}
        }
        if (apifilter === "videogamesHUB") {
            const {data} = await axios.get(`/videogamesHUB`, {params: {name, sort, sorting}})
            return {payload: data, payloadName: name}
        }
        const {data} = await axios.get(`/videogames`, {params: {name, sort, sorting}})
        return {payload: data, payloadName: name}
})

export const getVideogame = createAsyncThunk("videogames/getVideogame", 
   async (id) => {
    const {data} = await axios.get(`/videogames/${id}`)   
    return data
})

export const getExactVideogame = createAsyncThunk("videogames/getExactVideogame", 
    async (name) => {
    const {data} = await axios.get('/videogame', {params : {name}})
    return data
})

export const getAllGenresAndPlatforms = createAsyncThunk("videogames/getAllGenresAndPlatforms",  
    async () => {
    return Promise.all([axios.get('/genres'), axios.get('/platforms')])
    .then(resp => {return {payloadGenres: resp[0].data, payloadPlatforms: resp[1].data}})
    
})

export const sortBy = createAsyncThunk("videogames/sortBy", 
    async (args) => {
    const {apifilter, sort, sorting} = args
    if(apifilter === "rawg") {
    const {data} = await axios.get('/videogamesRawg', {params: {sort, sorting}})
    return {payload: data, payloadSort: sort}
    }
    if (apifilter === "videogamesHUB") {
    const {data} = await axios.get('/videogamesHUB', {params: {sort, sorting}})
    return {payload: data, payloadSort: sort}
    }
    const {data} = await axios.get('/videogames', {params: {sort, sorting}})
    return {payload: data, payloadSort: sort}
})

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
    display: "block"
}

const videogamesSlice = createSlice({
    name: "videogames",
    initialState,
    reducers: {
        unVideogame(state){
            state.videogame = {}
        },
        unSearchVideogames(state) {
            state.videogamesSearch = []
            state.videogamesSearchName = ""
        },
        cleanExactVideogame(state) {
            state.exactVideogame = ""
        },
        filterBy(state, {payload}){
            state.filter = payload
        },
        unSort(state) {
            state.sort = ""
        },
        sortAscToDesc(state, {payload}) {
            state.sorting = payload
        },
        morePagination(state) {
            state.pagination += 15
        },
        lessPagination(state) {
            state.pagination -= 15
        },
        resetPagination(state) {
            state.pagination = 15
        },
        changeApiFilter(state, {payload}) {
            state.apiFilter = payload
        },
        clearFilters(state) {
            state.apiFilter = ""
            state.filter = ""
            state.sort = ""
        },
        setDisplay(state, {payload}) {
            state.display = payload
        }
    },
    extraReducers: {
        [getAllVideogames.pending]: (state) => {
            state.status= "loading"
        },
        [getAllVideogames.fulfilled]: (state, {payload}) => {
            state.status= "success"
            state.videogames = payload
        },
        [getAllVideogames.rejected]: (state) => {
            state.status= "failed"
        },
        [createVideogame.pending] : (state) => {
            state.status= "loading"
        },
        [createVideogame.fulfilled] : (state) => {
            state.status= "success"
            state.videogameCreated = true
        },
        [createVideogame.rejected] : (state) => {
            state.status= "failed"
        },
        [searchVideogame.pending] : (state) => {
            state.status= "loading"
        },
        [searchVideogame.fulfilled] : (state, {payload}) => {
            state.status= "success"
            state.videogamesSearchName = payload.payloadName
            state.videogamesSearch = payload.payload
        },
        [searchVideogame.rejected] : (state, {payload}) => {
            state.status= "failed"
            state.videogamesSearchName= payload.payloadName
            state.videogamesSearch= []
        },
        [getVideogame.pending] : (state) => {
            state.status= "loading"
        },
        [getVideogame.fulfilled] : (state, {payload}) => {
            state.status= "success"
            state.videogame = payload
        },
        [getVideogame.rejected] : (state) => {
            state.status= "failed"
        },
        [getExactVideogame.pending] : (state) => {
            state.status= "loading"
        },
        [getExactVideogame.fulfilled] : (state, {payload}) => {
            state.status= "success"
            state.exactVideogame= payload
        },
        [getExactVideogame.rejected] : (state) => {
            state.status= "failed"
        },
        [getAllGenresAndPlatforms.pending] : (state) => {
            state.status= "loading"
        },
        [getAllGenresAndPlatforms.fulfilled] : (state, {payload}) => {
            state.status = "success"
            state.genres = payload.payloadGenres
            state.platforms = payload.payloadPlatforms
        },
        [getAllGenresAndPlatforms.rejected] : (state) => {
            state.status= "failed"
        },
        [sortBy.pending] : (state) => {
            state.status= "loading"
        },
        [sortBy.fulfilled] : (state, {payload}) => {
            state.status= "success"
            state.videogames= payload.payload
            state.sort = payload.payloadSort
        },
        [sortBy.rejected] : (state) => {
            state.status= "failed"
        }
    }
})

export const { unVideogame, unSearchVideogames, cleanExactVideogame,
               filterBy, unSort, sortAscToDesc, morePagination, lessPagination,
               resetPagination, changeApiFilter, clearFilters, setDisplay} = videogamesSlice.actions;

export default videogamesSlice.reducer;