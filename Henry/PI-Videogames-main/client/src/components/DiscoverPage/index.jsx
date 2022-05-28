import styles from "./DiscoverPage.module.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideogameCard from "../VideogameCard/VideogameCard";
import DiscoverPageHeader from "../DiscoverPageHeader";
import * as allActions from "../../redux/actions"


function Paginated({search}){
    const {videogames, videogamesFilter} = useSelector(state => state);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(allActions.getAllVideogames());
        dispatch(allActions.clear())
    }, []);

    return(
    <div className={styles.paginatedWrapper}>
            <DiscoverPageHeader />
        <section className={styles.videogamesContainer}>
        
        {
            search ? 
            videogamesFilter.length > 0 ? videogamesFilter.map(e => <VideogameCard
                id={e.id}
                image={e.background_image}
                key={e.id}
                genres={e.genres}
                name={e.name}
                rating={e.rating}   
                platforms={e.platforms}        
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
                platforms={e.platforms}        
            />)
        }
        </section>
    </div>
)}












export default Paginated;