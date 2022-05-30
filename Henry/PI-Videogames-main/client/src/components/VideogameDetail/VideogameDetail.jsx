import styles from "./VideogameDetail.module.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as allActions from "../../redux/actions/index";
import Nav from "../Nav/Nav";
import { useLocation } from "react-router-dom";

function VideogameDetail(props){
    const dispatch = useDispatch()
    const videogame = useSelector(state => state.videogame);
    const {id} = useLocation().state;
    useEffect(() => {
        dispatch(allActions.getVideogame(id));
    }, [])
    
    return (
        <div className={styles.PageWrapper}>
            <Nav />
            <div className={styles.Container}>
                <h1>Videogame: {videogame.name}</h1>
                <img className={styles.image}src={videogame.background_image} alt={`${videogame.name}`}/>
                <h1>Launch date: {videogame.launchDate}</h1>
                <h1>Platforms: {videogame?.platforms?.map(platforms =>`${platforms.platform.name}, `)}</h1>
                <h1>Rating: {videogame.rating}</h1>
                <h1>Description: {videogame.description}</h1>
                <h1>Genres: {videogame?.genres?.map(genre => `${genre.name}, `)}</h1>
            </div>
        </div>
    )
}












export default VideogameDetail;