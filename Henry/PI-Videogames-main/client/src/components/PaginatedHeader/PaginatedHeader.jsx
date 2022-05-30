import styles from "./PaginatedHeader.module.css";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import * as allActions from "../../redux/actions";

function PaginatedHeader(props){
    const { videogamesSearch, filter, sort, sorting } = useSelector(state => state);
    const dispatch = useDispatch();
    function unFilter(){
        dispatch(allActions.unFilter())
    }
    function unSort(){
        dispatch(allActions.unSort())
        dispatch(allActions.getAllVideogames())
    }
    function switchSorting() {
        if (sorting === "desc") {
        dispatch(allActions.sorting("asc"))
        return  dispatch(allActions.sort(sort, "asc"))
        }
        dispatch(allActions.sorting("desc"))
        dispatch(allActions.sort(sort, "desc"))
    }
    return(
        <div className={styles.headerWrapper}>
                <div className={styles.text}>
                    {
                    videogamesSearch !== "" ? <h1 className={styles.search}>Search: {videogamesSearch}</h1> : <h1>Discover Page</h1>
                    }
                </div>
                <div className={styles.filtersContainer}>
                    {
                    filter !== "" ? <div className={styles.filter}><h2>Filtered by:
                        <span className={styles.span}>{filter}</span></h2>
                        <h2 className={styles.button} onClick={()=> unFilter()}>Clear</h2></div> : null
                    }
                    {
                    sort !== "" ? <div className={styles.sort}><h2>Sorted by:
                        <span className={styles.span}>{sort === "rating" ? "Rating" : sort === "rating_top" ? "Top Rating" : sort === "metacritic" ? "Metacritic" : null}</span></h2>
                        <h2 className={styles.button} onClick={()=> unSort()}>Clear</h2>
                        <h2 className={styles.ascendToDescend} onClick={()=> switchSorting()}>{sorting === "desc" ? "Switch to Ascending" : "Switch to Descending"}</h2></div> : null
                    }
                </div>
        </div>
    )
}




export default PaginatedHeader;