import styles from "./VideogameDetail.module.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../Nav/Nav";
import placeHolder from "../../images/ImagePlaceholder.webp"
import { getVideogame } from "../../redux/videogamesSlice/videogamesSlice";
import loadingBar from "../../images/loadingBar.gif";
import { useParams } from "react-router-dom";

export default function VideogameDetail(props){
    const dispatch = useDispatch()
    const {name} = useParams()
    const { videogame, status } = useSelector(({videogames})=> videogames)
    useEffect(() => {
        const id = JSON.parse(localStorage.getItem(name))
        dispatch(getVideogame(id))
    },[]) // eslint-disable-line
    return (
        <div className={styles.wrapper}>
            <Nav />
            <div className={styles.header}>
                <h1>Videogame: {videogame.name}</h1>
            </div>
            {
            status === "loading" ? <img className={styles.loading} alt="loading" src={loadingBar}/> :
            <>
                <div className={styles.container}>
                    <div className={styles.imageContainer} style={{backgroundImage: videogame?.background_image ? `url(${videogame?.background_image})` : `url(${placeHolder})`}}/>
                    <div className={styles.infoContainer}>
                        <div className={styles.descriptionContainer}>
                            <h1 style={{marginTop: 10, marginBottom: 10}}>About:</h1>
                            <h4 dangerouslySetInnerHTML={{__html: videogame.description}}/>
                        </div>
                        <div className={styles.moreInfoContainer}>
                            <h3>Ratings: {videogame.rating}</h3>
                            <h3>Genres: {videogame?.genres !== undefined ? ` ${videogame.genres[0]?.name}` : null}
                            {videogame?.genres !== undefined ? videogame.genres.slice(1)?.map(e => `, ${e.name}`) : null} </h3>
                            <h3>Platforms: 
                            {videogame?.platforms !== undefined ? videogame.platforms[0]?.platform?.name ? ` ${videogame.platforms[0].platform.name}`: ` ${videogame.platforms[0].name}` : null}
                            { videogame?.platforms ? videogame.platforms?.slice(1)?.map(e => {if (e?.platform?.name) return `, ${e.platform.name}`; return `, ${e?.name}`}) : null}</h3>
                            {
                                videogame?.launchDate ? <h3>Launch date: {videogame.launchDate}</h3> : null
                            }
                        </div>
                    </div>
                </div>
            </>
            }
        </div>
    )
}