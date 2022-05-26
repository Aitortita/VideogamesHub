import styles from "./VideogameCreateCard.module.css";
import React from "react";

function VideogameCreateCard(props){
     /* eslint-disable */
    const {name, rating, launchDate, genres, description, image } = props.data;
     /* eslint-disable */
    return(
        <div className={styles.videogameItem}>
            <img src={image} className={styles.img}/>
            <h3>Name: {name}</h3>
            <h4>Description: {description}</h4>
            <h4>Rating: {rating}</h4>
            <h4>Launch date: {launchDate}</h4>
            {/* <h4>Genre: {genres?.map(genre => `${genre.name}, `)}</h4> */}
        </div>
    )
}


export default VideogameCreateCard;