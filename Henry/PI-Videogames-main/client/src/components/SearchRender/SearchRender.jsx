import styles from "./SearchRender.module.css"
import React from "react";
import { useSelector } from "react-redux";
import VideogameCard from "../VideogameCard/VideogameCard";

export default function SearchRender(props) {
    const { filter, pagination, videogamesSearch } = useSelector(state => state)
    return(
        <div className={styles.videogamesContainer}>
        {
            filter !== "" ? videogamesSearch.length > 0 ? 
                videogamesSearch.filter((game) => [...game?.genres?.filter((genre) => genre.name === filter), ...game?.platforms?.filter((platform) => platform?.platform?.name === filter)].length > 0)
                    .slice(pagination - 15, pagination).map(e => <VideogameCard
                    id={e.id}
                    image={e.background_image}
                    key={e.id}
                    genres={e.genres}
                    name={e.name}
                    rating={e.rating}
                    platforms={e.platforms}
                    />) : 
                    <h1>No Videogames found</h1> :
                videogamesSearch.length > 0 ? videogamesSearch.slice(pagination - 15, pagination).map(e => <VideogameCard
                    id={e.id}
                    image={e.background_image}
                    key={e.id}
                    genres={e.genres}
                    name={e.name}
                    rating={e.rating}
                    platforms={e.platforms}
                    />) : 
                    <h1>No Videogames found</h1>
        }
        </div>
    )
}