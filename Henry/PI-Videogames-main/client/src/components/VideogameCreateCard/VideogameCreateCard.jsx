import styles from "./VideogameCreateCard.module.css";
import React from "react";
import placeHolder from "../../images/ImagePlaceholder.jpg";

export default function VideogameCreateCard({data, platforms, genres}){
    const {name, rating, launchDate, description, image} = data;
    let backgroundImage = image
    if(!image) {
        backgroundImage = placeHolder
    }
    return(
        <div className={styles.cardContainer}>
            <div src={image} className={styles.imageContainer} style={{backgroundImage : `url(${backgroundImage})`}}/>
            <div className={styles.infoContainer}>
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
        </div>
    )
}