import styles from "./DiscoverPage.module.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideogameCard from "../VideogameCard/VideogameCard";
import DiscoverPageHeader from "../DiscoverPageHeader";
import * as allActions from "../../redux/actions"


function Paginated({search}){
    const {videogames, searchVideogames, filter} = useSelector(state => state);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(allActions.clear())
        dispatch(allActions.getAllVideogames())
    }, [dispatch, search]);

    return(
    <div className={styles.paginatedWrapper}>
            <DiscoverPageHeader />
        <section className={styles.videogamesContainer}>

        {
            filter !== "" ? search ? searchVideogames.length > 0 ? 
                searchVideogames.filter((game) => [...game?.genres?.filter((genre) => genre.name === filter), ...game?.platforms?.filter((platform) => platform?.platform?.name === filter)].length > 0)
                .map(e => <VideogameCard
                id={e.id}
                image={e.background_image}
                key={e.id}
                genres={e.genres}
                name={e.name}
                rating={e.rating}
                platforms={e.platforms}
                />) : <h1>No Videogames found</h1> :
                videogames.filter((game) =>[...game?.genres?.filter((genre) => genre.name === filter), ...game?.platforms?.filter((platform) => platform?.platform?.name === filter)].length > 0)
                .map(e => <VideogameCard
                id={e.id}
                image={e.background_image}
                key={e.id}
                genres={e.genres}
                name={e.name}
                rating={e.rating}       
                platforms={e.platforms}        
            />) :
            search ? 
            searchVideogames.length > 0 ? searchVideogames.map(e => <VideogameCard
                id={e.id}
                image={e.background_image}
                key={e.id}
                genres={e.genres}
                name={e.name}
                rating={e.rating}   
                platforms={e.platforms}        
            />) : <h1>No Videogames found</h1> :
            videogames?.map(e => <VideogameCard
                id={e.id}
                image={e.background_image}
                key={e.id}
                genres={e.genres}
                name={e.name}
                rating={e.rating}       
                platforms={e.platforms}        
            />)
        }
        </section>
    </div>
)}












export default Paginated;