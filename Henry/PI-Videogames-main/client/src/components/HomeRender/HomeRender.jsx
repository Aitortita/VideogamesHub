import styles from "./HomeRender.module.css"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideogameCard from "../VideogameCard/VideogameCard";
import { getAllVideogames, morePagination, lessPagination } from "../../redux/videogamesSlice/videogamesSlice";
import loadingBar from "../../images/loadingBar.gif";

export default function HomeRender(props) {
     /* eslint-disable */
    const dispatch = useDispatch()
    const { filter, pagination, videogames, apiFilter, status } = useSelector(({videogames}) => videogames)
    useEffect(() => {
        videogames.length === 0 ? dispatch(getAllVideogames(apiFilter)) : null;
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
        status === "loading" ? <img className={styles.loading} alt="loading" src={loadingBar}/> :
        <div>
            <div className={styles.videogamesContainer}>
            {
                filter !== "" ?
                videogames?.filter((game) =>[...game?.genres?.filter((genre) => genre.name === filter), ...game?.platforms?.filter((platform) => platform?.platform?.name === filter)].length > 0)
                .slice(pagination - 15, pagination).map(e => <VideogameCard
                    id={e.id}
                    image={e.background_image}
                    key={e.id}
                    genres={e.genres}
                    name={e.name}
                    platforms={e.platforms}
                    />) :
                videogames?.slice(pagination - 15, pagination).map(e => <VideogameCard
                    id={e.id}
                    image={e.background_image}
                    key={e.id}
                    genres={e.genres}
                    name={e.name}
                    platforms={e.platforms}
                    />)
            }
            </div>
            <div style={{display: variable}}>
            {
                pagination > 15 ? <a className={styles.button} onClick={() => onHide()}>Last Page</a> : null
            }
            {
                filter !== "" ? 
                videogames?.filter((game) =>[...game?.genres?.filter((genre) => genre.name === filter), ...game?.platforms?.filter((platform) => platform?.platform?.name === filter)].length > 0).length > pagination ?
                <a className={styles.button} onClick={() => onShow()}>Next Page</a> : null :
                videogames?.length > pagination ? <a className={styles.button} onClick={() => onShow()}>Next Page</a> : null
            }
            </div>
        </div>
    )
}