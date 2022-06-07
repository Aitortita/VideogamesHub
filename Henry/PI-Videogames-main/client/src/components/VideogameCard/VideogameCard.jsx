import styles from "./VideogameCard.module.css";
import React from "react";
import { Link } from 'react-router-dom';
import placeHolder from "../../images/ImagePlaceholder.jpg"
import { useDispatch } from "react-redux";
import { unVideogame } from "../../redux/videogamesSlice/videogamesSlice"

export default function VideogameCard({name, id, image, genres, platforms}){
    const dispatch = useDispatch()
    function enterVideogameDetail() {
        dispatch(unVideogame())
        localStorage.setItem('id', `${id}`)
    }
    return(
        <div className={styles.cardContainer}>
            <Link to={`/videogame/${name}`} onMouseDown={(() => enterVideogameDetail())} onClick={() => enterVideogameDetail()}>
                <div className={styles.imageContainer}  style={{backgroundImage : image ? `url(${image})` : `url(${placeHolder})`}}/>
            </Link>
            <div className={styles.cardInfo}>
            <h1>{name}</h1>
            <h4>Genre: {genres ? ` ${genres[0]?.name}` : null}{genres?.slice(1)?.map(genre => `, ${genre.name}`)}</h4>
            <h4>Platform: 
                {platforms ? platforms[0]?.platform?.name ? ` ${platforms[0].platform.name}` : 
                 platforms[0].name ? ` ${platforms[0].name}` : null : null}
                {platforms?.slice(1)?.map(e => {
                    if (e?.platform?.name) return `, ${e.platform.name}`;
                    return `, ${e?.name}`})}</h4>
            </div>
        </div>
    )
}