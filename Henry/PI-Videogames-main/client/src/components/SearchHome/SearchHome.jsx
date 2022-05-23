import "./SearchHome.css";
import React from "react";
import { useSelector } from "react-redux";
import VideogameCard from "../VideogameCard/VideogameCard";


function SearchHome(props) {
    const videogame = useSelector(state => state.videogamesFilter);

    return(
        <div>
            {
             videogame?.map(e => <VideogameCard 
                key={e.id}
                genre={e.genre}
                name={e.name}
                rating={e.rating}       
                platform={e.platform}
             />)
            }
        </div>
    )
}









export default SearchHome;