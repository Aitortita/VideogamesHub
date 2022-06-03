import styles from "./VideogameCard.module.css";
import React from "react";
import { Link } from 'react-router-dom';
import placeHolder from "../../images/ImagePlaceholder.jpg"
import { useDispatch } from "react-redux";
import * as allActions from "../../redux/actions"

export default function VideogameCard(props){
    const dispatch = useDispatch()
    let image = `url(${props?.image})`
    if (!props?.image) {
        image = `url(${placeHolder})`
    }
    return(
        <div className={styles.cardContainer}>
            <Link to={`/videogame/${props.name}`} state={{id: props.id}} onClick={() => dispatch(allActions.unVideogame())}>
                <div className={styles.imageContainer}  style={{backgroundImage : image}}/>
            </Link>
            <div className={styles.cardInfo}>
            <h1>{props.name}</h1>
            <h4>Genre: {` ${props?.genres[0]?.name}`}{props.genres?.slice(1).map(genre => `, ${genre.name}`)}</h4>
            <h4>Platform: 
                {props?.platforms ? props?.platforms[0]?.platform?.name ? ` ${props.platforms[0].platform.name}` : 
                 props.platforms[0].name ? ` ${props.platforms[0].name}` : null : null}
                {props.platforms?.slice(1).map(e => {
                    if (e?.platform?.name) return `, ${e.platform.name}`;
                    return `, ${e?.name}`})}</h4>
            </div>
        </div>
    )
}