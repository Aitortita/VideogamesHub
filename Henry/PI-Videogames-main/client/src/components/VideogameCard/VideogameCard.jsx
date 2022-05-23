import "./VideogameCard.css";
import React from "react";

function VideogameCard(props){
    return(
        <div className="videogame-item">
            <h2>{props.name}</h2>
            <h4>rating: {props.rating}</h4>
            <h4>genre: {props.genre}</h4>
            <h4>plataforma: {props.platform}</h4>
            <img src={props.image} alt={`foto de ${props.name}`}/>
        </div>
    )
};

export default VideogameCard;