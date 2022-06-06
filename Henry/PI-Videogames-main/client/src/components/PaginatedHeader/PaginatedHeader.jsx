import styles from "./PaginatedHeader.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPagination, unSort, getAllVideogames, filterBy, sortAscToDesc, sortBy, setDisplay, searchVideogame} from "../../redux/videogamesSlice/videogamesSlice";

export default function PaginatedHeader({search}){
    const { videogamesSearchName, filter, sort, sorting, apiFilter, status } = useSelector(({videogames}) => videogames)
    const dispatch = useDispatch();
    function un_filter(){
        if (status === "loading") return
        dispatch(resetPagination())
        dispatch(filterBy(""))
    }
    function un_sort(){
        if (status === "loading") return
        dispatch(resetPagination())
        dispatch(unSort())
        dispatch(getAllVideogames(apiFilter))
    }
    function switchSorting() {
        if (status === "loading") return
        if (search === true) {
            if (sorting === "DESC") {
                dispatch(resetPagination())
                dispatch(sortAscToDesc("ASC"))
                return  dispatch(searchVideogame({apiFilter, name: videogamesSearchName, sort, sorting:"ASC"}))
            }
            dispatch(resetPagination())
            dispatch(sortAscToDesc("DESC"))
            dispatch(searchVideogame({apiFilter, name: videogamesSearchName, sort, sorting: "DESC"}))
        }
        if (sorting === "DESC") {
            dispatch(resetPagination())
            dispatch(sortAscToDesc("ASC"))
            return  dispatch(sortBy({apiFilter, sort, sorting: "ASC"}))
        }
        dispatch(resetPagination())
        dispatch(sortAscToDesc("DESC"))
        dispatch(sortBy({apiFilter, sort, sorting:"DESC"}))
    }
    function resetFilter() {
        if (status === "loading") return
        dispatch(setDisplay("block"))
        dispatch(resetPagination())
        if (search === true) {
            return dispatch(searchVideogame({name:videogamesSearchName}))
        }
        dispatch(getAllVideogames())
    }
    return(
        <div className={styles.headerWrapper}>
                <div className={styles.text}>
                    {
                    search ? <h1 className={styles.search}>{videogamesSearchName}</h1> : <h1>Home Page</h1>
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
                        <h2 className={styles.button} onClick={()=> un_filter()}>Clear</h2></div> : null
                    }
                    {
                    sort !== "" ? <div className={styles.sort}><h2>Sorted by:
                        <span className={styles.span}>{sort === "rating" ? "Rating" : sort === "rating_top" ? "Top Rating" : sort === "metacritic" ? "Metacritic" : null}</span></h2>
                        <h2 className={styles.button} onClick={()=> un_sort()}>Clear</h2>
                        <h2 className={styles.ascendToDescend} onClick={()=> switchSorting()}>{sorting === "DESC" ? "Switch to Ascending" : "Switch to Descending"}</h2></div> : null
                    }
                </div>
        </div>
    )
}