import "./Paginated.css";
import React from "react";
import { useSelector } from "react-redux";
import VideogameCard from "../VideogameCard/VideogameCard";


function Paginated({props}){
    const {videogames, videogamesFilter} = useSelector(state => state);
    return(
        <div className="videogames-container">
        {
            props.search? 
            videogamesFilter.length > 0 ? videogamesFilter.map(e => <VideogameCard
                id={e.id}
                image={e.background_image}
                key={e.id}
                genres={e.genres}
                name={e.name}
                rating={e.rating}           
            />)
            :
            <h1>No Videogames found</h1>
            :
            videogames?.map(e => <VideogameCard
                id={e.id}
                image={e.background_image}
                key={e.id}
                genres={e.genres}
                name={e.name}
                rating={e.rating}       
            />)
        }
    </div>
    )
}












export default Paginated;