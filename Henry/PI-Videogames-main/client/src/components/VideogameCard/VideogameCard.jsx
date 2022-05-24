import "./VideogameCard.css";
import React from "react";
import { Link } from 'react-router-dom';

function VideogameCard(props){
    return(
        <div className="videogame-item">
            <Link to={`/videogame/${props.name}`} state={{id: props.id}}>
            <h2>{props.name}</h2>
            <h4>rating: {props.rating}</h4>
            <h4>genre: {props.genre}</h4>
            <h4>plataforma: {props.platform}</h4>
            <img src={props.image} alt={`foto de ${props.name}`} className="img"/>
            </Link>
        </div>
    )
};

export default VideogameCard;