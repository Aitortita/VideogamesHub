import styles from "./DiscoverPageHeader.module.css";
import React from "react";
import { useSelector } from "react-redux";

function DiscoverPageHeader(props){
    const { videogamesSearch, filter } = useSelector(state => state);
    return(
        <div className={styles.DiscoverPageHeaderWrapper}>
                <div className={styles.search}>
                {
                    videogamesSearch !== "" ? <h1>Search: {videogamesSearch}</h1> : <h1>Discover Page</h1>
                }
                </div>
                <div className={styles.filters}>
                    {
                        filter !== "" ? <h2>Filtered by: {filter}</h2> : null
                    }
                    {/* {
                        sorted ? <h2>Sorted by:</h2> : null
                    } */}
                </div>
        </div>
    )
}




export default DiscoverPageHeader;