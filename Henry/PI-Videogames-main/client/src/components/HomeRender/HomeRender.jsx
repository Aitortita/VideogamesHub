import styles from "./HomeRender.module.css"
import React from "react";
import { useSelector } from "react-redux";
import VideogameCard from "../VideogameCard/VideogameCard";

export default function HomeRender(props) {
    const { filter, pagination, videogames } = useSelector(state => state)
    return(
        <div className={styles.videogamesContainer}>
        {
            filter !== "" ?
                videogames?.filter((game) =>[...game?.genres?.filter((genre) => genre.name === filter), ...game?.platforms?.filter((platform) => platform?.platform?.name === filter)].length > 0)
                    .slice(pagination - 15, pagination).map(e => <VideogameCard
                    id={e.id}
                    image={e.background_image}
                    key={e.id}
                    genres={e.genres}
                    name={e.name}
                    rating={e.rating}
                    platforms={e.platforms}
                    />) :
                videogames?.slice(pagination - 15, pagination).map(e => <VideogameCard
                    id={e.id}
                    image={e.background_image}
                    key={e.id}
                    genres={e.genres}
                    name={e.name}
                    rating={e.rating}       
                    platforms={e.platforms}        
                    />)
        }
        </div>
    )
}