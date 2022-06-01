import styles from "./VideogameCreateCard.module.css";
import React from "react";

export default function VideogameCreateCard({data, platforms, genres}){
     /* eslint-disable */
    const {name, rating, launchDate, description, image} = data;
     /* eslint-disable */
    return(
        <div className={styles.videogameItem}>
            <img src={image} className={styles.img}/>
            <h3>Name*: {name}</h3>
            <h4>Description*: {description}</h4>
            <h4>Genres*: 
            {genres.length > 0 ? ` ${genres[0]}` : null}
            {genres.length > 1 ? genres.slice(1).map(e => `, ${e}`) : null}
            </h4>
            <h4>Platforms*: 
            {platforms.length > 0 ? ` ${platforms[0]}` : null}
            {platforms.length > 1 ? platforms.slice(1).map(e => `, ${e}`) : null}
            </h4>
            <h4>Rating: {rating}</h4>
            <h4>Launch date: {launchDate}</h4>
        </div>
    )
}