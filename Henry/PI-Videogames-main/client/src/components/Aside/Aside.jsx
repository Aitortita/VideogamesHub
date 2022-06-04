import styles from "./Aside.module.css"; 
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as allActions from "../../redux/actions";

export default function Aside({search}){
    const { videogamesSearchName, genres, platforms, filter, sort, sorting, apiFilter, display } = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(allActions.getAllGenresAndPlatforms())
    }, []) // eslint-disable-line

    function onFilter(e){
        if (filter === e) {
            dispatch(allActions.resetPagination());
           return dispatch(allActions.unFilter())
        }
        dispatch(allActions.resetPagination())
        dispatch(allActions.filter(e))
    }
    function onSort(e){
        if (search === true) {
            if (e === sort) {
            dispatch(allActions.resetPagination())
            dispatch(allActions.unSort())
            return dispatch(allActions.searchVideogame(apiFilter, videogamesSearchName))
            }
            dispatch(allActions.resetPagination())
            dispatch(allActions.searchVideogame(apiFilter, videogamesSearchName, e, sorting))
        }
        if (e === sort) {
        dispatch(allActions.resetPagination())
        dispatch(allActions.unSort())
        return dispatch(allActions.getAllVideogames(apiFilter))
        }
        dispatch(allActions.resetPagination())
        dispatch(allActions.sort(apiFilter, e, sorting))
    }
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

    function rawgFilter() {
        if (search === true) {
            if ( apiFilter === "rawg") {
                dispatch(allActions.resetPagination())
                dispatch(allActions.changeApiFilter(""))
                return dispatch(allActions.searchVideogame("", videogamesSearchName))
            }
            dispatch(allActions.setDisplay("block"))
            dispatch(allActions.resetPagination())
            dispatch(allActions.changeApiFilter("rawg"))
            return dispatch(allActions.searchVideogame("rawg", videogamesSearchName))
        }
        if ( apiFilter === "rawg") {
            dispatch(allActions.resetPagination())
            dispatch(allActions.changeApiFilter(""))
            return dispatch(allActions.getAllVideogames())
        }
        dispatch(allActions.setDisplay("block"))
        dispatch(allActions.resetPagination())
        dispatch(allActions.changeApiFilter("rawg"))
        dispatch(allActions.getAllVideogames("rawg"))
    }

    function hubFilter() {
        if (search === true) {
            if ( apiFilter === "videogamesHUB") {
            dispatch(allActions.setDisplay("block"))
            dispatch(allActions.resetPagination())
                dispatch(allActions.changeApiFilter(""))
                return dispatch(allActions.searchVideogame("", videogamesSearchName))
            }
            if (sort === "rating_top" || sort === "metacritic") dispatch(allActions.unSort())
            dispatch(allActions.setDisplay("none"))
            dispatch(allActions.resetPagination())
            dispatch(allActions.changeApiFilter("videogamesHUB"))
            return dispatch(allActions.searchVideogame("videogamesHUB", videogamesSearchName))
        }
        if ( apiFilter === "videogamesHUB") {
            dispatch(allActions.setDisplay("block"))
            dispatch(allActions.resetPagination())
            dispatch(allActions.changeApiFilter(""))
            return dispatch(allActions.getAllVideogames())
        }
        if (sort === "rating_top" || sort === "metacritic") dispatch(allActions.unSort())
        dispatch(allActions.setDisplay("none"))
        dispatch(allActions.resetPagination())
        dispatch(allActions.changeApiFilter("videogamesHUB"))
        dispatch(allActions.getAllVideogames("videogamesHUB"))
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