import styles from "./VideogameCard.module.css";
import React from "react";
import { Link } from 'react-router-dom';
import placeHolder from "../../images/ImagePlaceholder.jpg"

function VideogameCard(props){
    return(
        <div className={styles.videogameItem}>
            <Link to={`/videogame/${props.name}`} state={{id: props.id}}>
                {/* eslint-disable */}
            <img src={props.image ? props.image : placeHolder} className={styles.img}/>
                {/* eslint-disable */}
            </Link>
            <div className={styles.cardInfo}>
            <h2>{props.name}</h2>
            <h4>Genre: {` ${props?.genres[0]?.name}`}{props.genres?.slice(1).map(genre => `, ${genre.name}`)}</h4>
            <h4>Platform: 
                {props?.platforms[0]?.platform?.name ? ` ${props.platforms[0].platform.name}` : props?.platforms[0].name ? ` ${props.platforms[0].name}` : null}
                {props.platforms?.slice(1).map(e => {
                if (e?.platform?.name) return `, ${e.platform.name}`;
                return `, ${e?.name}`})}</h4>
            {/* <h4>Rating: {props.rating}</h4> */}
            </div>
        </div>
    )
};

export default VideogameCard;