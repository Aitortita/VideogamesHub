import styles from "./PaginatedHeader.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as allActions from "../../redux/actions";

export default function PaginatedHeader({search}){
    const { videogamesSearchName, filter, sort, sorting, apiFilter } = useSelector(state => state);
    const dispatch = useDispatch();
    function unFilter(){
        dispatch(allActions.resetPagination())
        dispatch(allActions.unFilter())
    }
    function unSort(){
        dispatch(allActions.resetPagination())
        dispatch(allActions.unSort())
        dispatch(allActions.getAllVideogames(apiFilter))
    }
    function switchSorting() {
        if (search === true) {
            if (sorting === "DESC") {
                dispatch(allActions.resetPagination())
                dispatch(allActions.sorting("ASC"))
                return  dispatch(allActions.searchVideogame(apiFilter, videogamesSearchName, sort, "ASC"))
            }
            dispatch(allActions.resetPagination())
            dispatch(allActions.sorting("DESC"))
            dispatch(allActions.searchVideogame(apiFilter, videogamesSearchName, sort, "DESC"))
        }
        if (sorting === "DESC") {
            dispatch(allActions.resetPagination())
            dispatch(allActions.sorting("ASC"))
            return  dispatch(allActions.sort(apiFilter, sort, "ASC"))
        }
        dispatch(allActions.resetPagination())
        dispatch(allActions.sorting("DESC"))
        dispatch(allActions.sort(apiFilter, sort, "DESC"))
    }
    function resetFilter() {
        dispatch(allActions.setDisplay("block"))
        dispatch(allActions.resetPagination())
        dispatch(allActions.changeApiFilter(""))
        if (search === true) {
            return dispatch(allActions.searchVideogame("", videogamesSearchName))
        }
        dispatch(allActions.getAllVideogames(""))
    }
    return(
        <div className={styles.headerWrapper}>
                <div className={styles.text}>
                    {
                    search ? <h1 className={styles.search}>Search: {videogamesSearchName}</h1> : <h1>Home Page</h1>
                    }
                </div>
                <div className={styles.filtersContainer}>
                    {
                        apiFilter === "rawg" ? <div className={styles.filter}><h2>Filtered by: <span className={styles.span}>Rawg</span></h2><h2 className={styles.button} onClick={()=> resetFilter()}>Clear</h2></div> : null
                    }
                    {
                        apiFilter === "videogamesHUB" ? <div className={styles.filter}><h2>Filtered by: <span className={styles.span}>VideogamesHUB</span></h2><h2 className={styles.button} onClick={()=> resetFilter()}>Clear</h2></div> : null
                    }
                    {
                    filter !== "" ? <div className={styles.filter}><h2>Filtered by:
                        <span className={styles.span}>{filter}</span></h2>
                        <h2 className={styles.button} onClick={()=> unFilter()}>Clear</h2></div> : null
                    }
                    {
                    sort !== "" ? <div className={styles.sort}><h2>Sorted by:
                        <span className={styles.span}>{sort === "rating" ? "Rating" : sort === "rating_top" ? "Top Rating" : sort === "metacritic" ? "Metacritic" : null}</span></h2>
                        <h2 className={styles.button} onClick={()=> unSort()}>Clear</h2>
                        <h2 className={styles.ascendToDescend} onClick={()=> switchSorting()}>{sorting === "DESC" ? "Switch to Ascending" : "Switch to Descending"}</h2></div> : null
                    }
                </div>
        </div>
    )
}