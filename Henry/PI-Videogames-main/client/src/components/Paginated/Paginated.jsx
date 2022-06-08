import styles from "./Paginated.module.css";
import React from "react";
import PaginatedHeader from "../PaginatedHeader/PaginatedHeader"
import HomeRender from "../HomeRender/HomeRender";
import SearchRender from "../SearchRender/SearchRender";
import { useSelector } from "react-redux";
import loadingBar from "../../images/loadingBar.gif"
export default function Paginated({search}){
    const { status } = useSelector(({videogames}) => videogames)
    return(
    <div className={styles.paginatedWrapper}>
            <PaginatedHeader search={search}/>
        {
            status === "loading" ? <img className={styles.loading} src={loadingBar}/> :
            search ? <SearchRender /> : <HomeRender />
        }
    </div>
)}
