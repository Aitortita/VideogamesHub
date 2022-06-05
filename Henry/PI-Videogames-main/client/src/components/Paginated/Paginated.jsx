import styles from "./Paginated.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginatedHeader from "../PaginatedHeader/PaginatedHeader"
import HomeRender from "../HomeRender/HomeRender";
import SearchRender from "../SearchRender/SearchRender";
import { getAllVideogames, morePagination, lessPagination } from "../../redux/videogamesSlice/videogamesSlice"

export default function Paginated({search}){
    const { videogames, videogamesSearch, filter, pagination, apiFilter } = useSelector(({videogames}) => videogames)
    const dispatch = useDispatch()
    useEffect(() => {
        if (videogames.length === 0) dispatch(getAllVideogames(apiFilter))
            setVariable("block")
    }, [dispatch]) // eslint-disable-line
    let [variable, setVariable] = useState("none")

    function onShow(){
        window.scrollTo(0, 0);
        dispatch(morePagination());
    }
    function onHide(){
        window.scrollTo(0, 0);
        if(pagination > 15) dispatch(lessPagination())
    }
    /* eslint-disable*/
    return(
    <div className={styles.paginatedWrapper}>
            <PaginatedHeader search={search}/>
        {
            search ? <SearchRender /> : <HomeRender />
        }
        <div style={{display: variable}}>
            {
                pagination > 15 ? <a className={styles.button} onClick={() => onHide()}>Last Page</a> : null
            }
            {
                search === true ? filter !== "" ? pagination > 
                videogamesSearch.filter((game) => [...game?.genres?.filter((genre) => genre.name === filter), ...game?.platforms?.filter((platform) => platform?.platform?.name === filter)].length > 0).length ?
                null : <a className={styles.button} onClick={() => onShow()}>Next Page</a> :
                pagination > videogamesSearch?.length ? null : <a className={styles.button} onClick={() => onShow()}>Next Page</a> :
                pagination > videogames?.length ? null : <a className={styles.button} onClick={() => onShow()}>Next Page</a>
            }
        </div>
    </div>
)}
