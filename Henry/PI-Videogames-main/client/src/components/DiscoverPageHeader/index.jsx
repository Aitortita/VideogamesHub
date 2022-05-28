import styles from "./DiscoverPageHeader.module.css";
import React from "react";
import { useSelector } from "react-redux";

function DiscoverPageHeader(props){
    const { videogamesSearch } = useSelector(state => state);
    console.log(videogamesSearch)
    return(
        <div className={styles.DiscoverPageHeaderWrapper}>
            <div className={styles.DiscoverPageHeader}>
                {
                    videogamesSearch !== "" ? <h1>{videogamesSearch}</h1> :
                    <h1>Discover Page</h1>
                }
            </div>
        </div>
    )
}




export default DiscoverPageHeader;