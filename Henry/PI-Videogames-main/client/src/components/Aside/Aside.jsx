import styles from "./Aside.module.css"; 
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPagination, filterBy, unSort, searchVideogame, getAllVideogames, sortBy, changeApiFilter, setDisplay, getAllGenresAndPlatforms  } from "../../redux/videogamesSlice/videogamesSlice";

export default function Aside({search}){
    const { videogamesSearchName, genres, platforms, filter, sort, sorting, apiFilter, display, status } = useSelector(({videogames}) => videogames)
    const dispatch = useDispatch();

    const [counterGenres, setCounterGenres] = useState(5)
    const [counterPlatforms, setCounterPlatforms] = useState(5)

    function moreGenres(){
        setCounterGenres(19)
    } 
    function lessGenres(){
        setCounterGenres(5)
    }
    function morePlatforms(){
        setCounterPlatforms(55)
    }
    function lessPlatforms(){
        setCounterPlatforms(5)
    }

    useEffect(()=> {
        dispatch(getAllGenresAndPlatforms())
    }, [dispatch])

    function onFilter(e){
        if (status === "loading") return;
        if (filter === e) {
            dispatch(resetPagination());
           return dispatch(filterBy(""))
        }
        dispatch(resetPagination())
        dispatch(filterBy(e))
    }
    
    function onSort(e){
        if (status === "loading") return;
        if (search === true) {
            if (e === sort) {
            dispatch(resetPagination())
            dispatch(unSort())
            return dispatch(searchVideogame({apiFilter, name:videogamesSearchName}))
            }
            dispatch(resetPagination())
            dispatch(searchVideogame({apiFilter, name:videogamesSearchName, sort:e, sorting}))
        }
        if (e === sort) {
        dispatch(resetPagination())
        dispatch(unSort())
        return dispatch(getAllVideogames(apiFilter))
        }
        dispatch(resetPagination())
        dispatch(sortBy({apiFilter, sort:e, sorting}))
    }

    function rawgFilter() {
        if (status === "loading") return;
        if (search === true) {
            if ( apiFilter === "rawg") {
                dispatch(resetPagination())
                dispatch(changeApiFilter(""))
                return dispatch(searchVideogame({name:videogamesSearchName}))
            }
            dispatch(setDisplay("block"))
            dispatch(resetPagination())
            dispatch(changeApiFilter("rawg"))
            return dispatch(searchVideogame({apiFilter: "rawg", name:videogamesSearchName}))
        }
        if ( apiFilter === "rawg") {
            dispatch(resetPagination())
            dispatch(changeApiFilter(""))
            return dispatch(getAllVideogames())
        }
        dispatch(setDisplay("block"))
        dispatch(resetPagination())
        dispatch(changeApiFilter("rawg"))
        dispatch(getAllVideogames("rawg"))
    }

    function hubFilter() {
        if (status === "loading") return;
        if (search === true) {
            if ( apiFilter === "videogamesHUB") {
            dispatch(setDisplay("block"))
            dispatch(resetPagination())
                dispatch(changeApiFilter(""))
                return dispatch(searchVideogame({name: videogamesSearchName}))
            }
            if (sort === "rating_top" || sort === "metacritic") dispatch(unSort())
            dispatch(setDisplay("none"))
            dispatch(resetPagination())
            dispatch(changeApiFilter("videogamesHUB"))
            return dispatch(searchVideogame({apiFilter: "videogamesHUB", name: videogamesSearchName}))
        }
        if ( apiFilter === "videogamesHUB") {
            dispatch(setDisplay("block"))
            dispatch(resetPagination())
            dispatch(changeApiFilter(""))
            return dispatch(getAllVideogames())
        }
        if (sort === "rating_top" || sort === "metacritic") dispatch(unSort())
        dispatch(setDisplay("none"))
        dispatch(resetPagination())
        dispatch(changeApiFilter("videogamesHUB"))
        dispatch(getAllVideogames("videogamesHUB"))
    }

    return(
        <div className={styles.asideWrapper}>
            {/* eslint-disable */}
            <div className={styles.aside}>
                <a className={styles.landingPage} href="/">Landing page</a>
                <h2 style={{marginTop: "15px"}}>Custom</h2>
                <ul>
                    <li><a href="/create/videogame"> Create a videogame</a></li>
                </ul>
                <h2>Sort by</h2>
                <ul>
                    <li><a onClick={() => onSort("rating")}>Rating</a></li>
                    <li><a style={{display: display}} onClick={() => onSort("rating_top")}>Top Rating</a></li>
                    <li><a style={{display: display}} onClick={() => onSort("metacritic")}>Metacritic</a></li>
                </ul>
                <h2>Filter by</h2>
                <h3>Api</h3>
                <ul>
                    <li><a onClick={() => rawgFilter()}>Rawg</a></li>
                    <li><a onClick={() => hubFilter()}>VideogamesHUB</a></li>
                </ul>
                <h3 className={styles.tag}>Genres</h3>
                <div className={styles.filters}>
                    <ul>
                    { 
                        genres?.slice(0,counterGenres).map(genre => <li key={genre.name}><a onClick={() => onFilter(genre.name)}>{genre.name}</a></li>)
                    }
                    {
                        counterGenres < 10 ? <li><h4 className={styles.showers} onClick={() => moreGenres()}>Show more genres 🔽</h4></li> :
                        <li><h4 className={styles.showers} onClick={() => lessGenres()}>Hide more genres 🔼</h4></li>
                    }
                    </ul>
                </div>
                <h3 className={styles.tag}>Platforms</h3>
                <div className={styles.filters}>
                <ul>
                    {
                        platforms?.slice(0,counterPlatforms).map(platform => <li key={platform.name}><a onClick={() => onFilter(platform.name)}>{platform.name}</a></li>)
                    }
                    {
                        counterPlatforms < 55 ? <li><h4 className={styles.showers} onClick={() => morePlatforms()}>Show more platforms 🔽</h4></li> :
                        <li><h4 className={styles.showers} onClick={() => lessPlatforms()}>Hide more platforms 🔼</h4></li>
                    }
                </ul>
                </div>
            </div>
        </div>
    )
}