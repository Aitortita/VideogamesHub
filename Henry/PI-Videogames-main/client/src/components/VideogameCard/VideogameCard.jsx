import styles from "./VideogameCard.module.css";
import React from "react";
import { Link } from 'react-router-dom';

function VideogameCard(props){
    return(
        <div className={styles.videogameItem}>
            <Link to={`/videogame/${props.name}`} state={{id: props.id}}>
            <img src={props.image} alt={`foto de ${props.name}`} className={styles.img}/>
            <h2>{props.name}</h2>
            <h4>Genre: {props.genres?.map(genre => `${genre.name}, `)}</h4>
            {/* <h4>Rating: {props.rating}</h4> */}
            </Link>
        </div>
    )
};

export default VideogameCard;