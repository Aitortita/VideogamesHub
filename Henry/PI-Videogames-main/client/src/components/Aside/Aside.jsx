import styles from "./Aside.module.css"; 
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as allActions from "../../redux/actions";

function Aside({search}){
    const { videogamesSearchName, genres, platforms, filter, sort, sorting } = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(allActions.getAllGenresAndPlatforms())
    }, 
    /* eslint-disable */
    [])
    /* eslint-disable */
    const navigate = useNavigate();

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
            return dispatch(allActions.searchVideogame(videogamesSearchName))
            }
            dispatch(allActions.resetPagination())
            dispatch(allActions.searchVideogame(videogamesSearchName, e, sorting))
        }
        if (e === sort) {
        dispatch(allActions.resetPagination())
        dispatch(allActions.unSort())
        return dispatch(allActions.getAllVideogames())
        }
        dispatch(allActions.resetPagination())
        dispatch(allActions.sort(e, sorting))
    }
    const [counterGenres, setCounterGenres] = useState(5);
    const [counterPlatforms, setCounterPlatforms] = useState(5);

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

    return(
        <div className={styles.asideWrapper}>
            {/* eslint-disable */}
            <div className={styles.aside}>
                <h1 className={styles.landingPage} onClick={()=> navigate("/")}>Landing page</h1>
                <h2>Custom</h2>
                <ul>
                    <li><a href="/create/videogame"> Create a videogame</a></li>
                </ul>
                <h2>Sort by</h2>
                <ul>
                    <li><a onClick={() => onSort("rating")}>Rating</a></li>
                    <li><a onClick={() => onSort("rating_top")}>Top Rating</a></li>
                    <li><a onClick={() => onSort("metacritic")}>Metacritic</a></li>
                </ul>
                <h2>Filter by</h2>
                <h3 className={styles.tag}>Genres</h3>
                <div className={styles.filters}>
                    <ul>
                    { 
                        genres?.slice(0,counterGenres).map(genre => <li key={genre.name}><a onClick={() => onFilter(genre.name)}>{genre.name}</a></li>)
                    }
                    {
                    counterGenres < 10 ? <li><h4 className={styles.showers} onClick={() => moreGenres()}>Show all genres 🔽</h4></li> : <li><h4 className={styles.showers} onClick={() => lessGenres()}>Hide all genres 🔼</h4></li>
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
                    counterPlatforms < 55 ? <li><h4 className={styles.showers} onClick={() => morePlatforms()}>Show all platforms 🔽</h4></li> : <li><h4 className={styles.showers} onClick={() => lessPlatforms()}>Hide all platforms 🔼</h4></li>
                    }
                </ul>
                </div>
            </div>
        </div>
    )
}




export default Aside;