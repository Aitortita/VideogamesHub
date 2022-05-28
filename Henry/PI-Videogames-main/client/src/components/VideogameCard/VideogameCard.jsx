import styles from "./VideogameCard.module.css";
import React from "react";
import { Link } from 'react-router-dom';

function VideogameCard(props){
    return(
        <div className={styles.videogameItem}>
            <Link to={`/videogame/${props.name}`} state={{id: props.id}}>
                {/* eslint-disable */}
            <img src={props.image} className={styles.img}/>
                {/* eslint-disable */}
            </Link>
            <div className={styles.cardInfo}>
            <h2>{props.name}</h2>
            <h4>Genre: {props.genres?.map(genre => `${genre.name}, `)}</h4>
            <h4>Platform: {props.platforms?.map(e => `${e?.platform?.name}, `)}</h4>
            {/* <h4>Rating: {props.rating}</h4> */}
            </div>
        </div>
    )
};

export default VideogameCard;