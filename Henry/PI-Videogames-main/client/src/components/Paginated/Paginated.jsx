import styles from "./Paginated.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideogameCard from "../VideogameCard/VideogameCard";
import * as allActions from "../../redux/actions"
import PaginatedHeader from "../PaginatedHeader/PaginatedHeader"

function Paginated({search}){
    const {videogames, searchVideogames, filter, pagination} = useSelector(state => state);
    const dispatch = useDispatch()
    useEffect(() => {
            dispatch(allActions.clear())
            dispatch(allActions.resetPagination())
            dispatch(allActions.getAllVideogames())
            setShowMore(true)
    }, [dispatch]);

    let [showMore, setShowMore] = useState(false)

    function onShow(){
        if (pagination > videogames.length && pagination > searchVideogames) return alert("thewwee awee no mowee pages Onii-chann q(≧▽≦q)");
        window.scrollTo(0, 0);
        dispatch(allActions.morePagination());
    }
    function onHide(){
        window.scrollTo(0, 0);
        if(pagination > 15) dispatch(allActions.lessPagination())
    }

    return(
    <div className={styles.paginatedWrapper}>
            <PaginatedHeader />
        <section className={styles.videogamesContainer}>
        {
            filter !== "" ? search ? searchVideogames.length > 0 ? 
                searchVideogames.filter((game) => [...game?.genres?.filter((genre) => genre.name === filter), ...game?.platforms?.filter((platform) => platform?.platform?.name === filter)].length > 0)
                .slice(pagination - 15, pagination).map(e => <VideogameCard
                id={e.id}
                image={e.background_image}
                key={e.id}
                genres={e.genres}
                name={e.name}
                rating={e.rating}
                platforms={e.platforms}
                />) : <h1>No Videogames found</h1> :
                videogames.filter((game) =>[...game?.genres?.filter((genre) => genre.name === filter), ...game?.platforms?.filter((platform) => platform?.platform?.name === filter)].length > 0)
                .slice(pagination - 15, pagination).map(e => <VideogameCard
                id={e.id}
                image={e.background_image}
                key={e.id}
                genres={e.genres}
                name={e.name}
                rating={e.rating}       
                platforms={e.platforms}        
            />) :
            search ? 
            searchVideogames.length > 0 ? searchVideogames.slice(pagination - 15, pagination).map(e => <VideogameCard
                id={e.id}
                image={e.background_image}
                key={e.id}
                genres={e.genres}
                name={e.name}
                rating={e.rating}   
                platforms={e.platforms}        
            />) : <h1>No Videogames found</h1> :
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
        </section>
        <div>
            {
                pagination > 15 ? <a className={showMore === true ? styles.showMore : styles.showNone} onClick={() => onHide()}>Last Page</a> : null
            }
            {
                pagination > videogames.length && pagination > searchVideogames ? null : <a className={showMore === true ? styles.showMore : styles.showNone} onClick={() => onShow()}>Next Page</a>
            }
        </div>
    </div>
)}

export default Paginated;