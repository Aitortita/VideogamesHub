import styles from "./Paginated.module.css";
import React from "react";
import PaginatedHeader from "../PaginatedHeader/PaginatedHeader"
import HomeRender from "../HomeRender/HomeRender";
import SearchRender from "../SearchRender/SearchRender";

export default function Paginated({search}){
    return(
    <div className={styles.paginatedWrapper}>
            <PaginatedHeader search={search}/>
        {
            search ? <SearchRender /> : <HomeRender />
        }
    </div>
)}
