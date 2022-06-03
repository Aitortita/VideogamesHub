import styles from "./VideogameDetail.module.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as allActions from "../../redux/actions/index";
import Nav from "../Nav/Nav";
import { useLocation } from "react-router-dom";
import placeholder from "../../images/ImagePlaceholder.jpg"

export default function VideogameDetail(props){
    const dispatch = useDispatch()
    const videogame = useSelector(state => state.videogame);
    const {id} = useLocation().state;
    useEffect(() => {
        dispatch(allActions.getVideogame(id))
    },[]) // eslint-disable-line

    let backgroundImage = videogame?.background_image
    if (!videogame?.background_image) backgroundImage = placeholder;

    return (
        <div className={styles.wrapper}>
            <Nav />
            <div className={styles.header}>
                <h1>Videogame: {videogame.name}</h1>
            </div>
            <div className={styles.container}>
                <div className={styles.imageContainer} style={{backgroundImage: `url(${backgroundImage})`}}/>
                <div className={styles.infoContainer}>
                    <div className={styles.descriptionContainer}>
                        <h1 style={{marginTop: 10, marginBottom: 10}}>About:</h1>
                        <h4 dangerouslySetInnerHTML={{__html: videogame.description}}/>
                    </div>
                    <div className={styles.moreInfoContainer}>
                        <h3>Ratings: {videogame.rating}</h3>
                        <h3>Genres: {videogame?.genres !== undefined ? ` ${videogame.genres[0]?.name}` : null}
                        {videogame?.genres !== undefined ? videogame.genres.slice(1)?.map(e => `, ${e.name}`) : null} </h3>
                        <h3>Platforms: {videogame?.platforms !== undefined ? videogame.platforms[0]?.platform?.name ? ` ${videogame.platforms[0].platform.name}`: ` ${videogame.platforms[0].name}` : null}
                        { videogame?.platforms ? videogame.platforms?.slice(1)?.map(e => {if (e?.platform?.name) return `, ${e.platform.name}`; return `, ${e?.name}`}) : null}</h3>
                        {
                            videogame?.launchDate ? <h3>Launch date: {videogame.launchDate}</h3> : null
                        }   
                    </div>
                </div>
            </div>
        </div>
    )
}