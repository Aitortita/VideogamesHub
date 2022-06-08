import styles from "../HomeRender/HomeRender.module.css"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideogameCard from "../VideogameCard/VideogameCard";
import { morePagination, lessPagination } from "../../redux/videogamesSlice/videogamesSlice";

export default function SearchRender(props) {
     /* eslint-disable */
    const dispatch = useDispatch()
    const { filter, pagination, videogamesSearch } = useSelector(({videogames}) => videogames)
    useEffect(() => {
            setVariable("block")
    }, [])
    let [variable, setVariable] = useState("none")
    function onShow(){
        window.scrollTo(0, 0);
        dispatch(morePagination());
    }
    function onHide(){
        window.scrollTo(0, 0);
        if(pagination > 15) dispatch(lessPagination())
    }
    return(
    <div>
        <div className={styles.videogamesContainer}>
            {
                filter !== "" ? videogamesSearch.length > 0 ? 
                videogamesSearch.filter((game) => [...game?.genres?.filter((genre) => genre.name === filter), ...game?.platforms?.filter((platform) => platform?.platform?.name === filter)].length > 0)
                .slice(pagination - 15, pagination).map(e => <VideogameCard
                    id={e.id}
                    image={e.background_image}
                    key={e.id}
                    genres={e.genres}
                    name={e.name}
                    platforms={e.platforms}
                    />) : 
                    <h1>No Videogames found</h1> :
                videogamesSearch.length > 0 ? videogamesSearch.slice(pagination - 15, pagination).map(e => <VideogameCard
                    id={e.id}
                    image={e.background_image}
                    key={e.id}
                    genres={e.genres}
                    name={e.name}
                    platforms={e.platforms}
                    />) : 
                    <h1>No Videogames found</h1>
            }
        </div>
        <div style={{display: variable}}>
            {
                pagination > 15 ? <a className={styles.button} onClick={() => onHide()}>Last Page</a> : null
            }
            {
                filter !== "" ? 
                videogamesSearch?.filter((game) =>[...game?.genres?.filter((genre) => genre.name === filter), ...game?.platforms?.filter((platform) => platform?.platform?.name === filter)].length > 0).length > pagination ?
                <a className={styles.button} onClick={() => onShow()}>Next Page</a> : null :
                videogamesSearch?.length > pagination ? <a className={styles.button} onClick={() => onShow()}>Next Page</a> : null
            }
        </div>
    </div>
    )
}