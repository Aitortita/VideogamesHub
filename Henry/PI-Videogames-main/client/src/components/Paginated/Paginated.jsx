import styles from "./Paginated.module.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import VideogameCard from "../VideogameCard/VideogameCard";
import * as allActions from "../../redux/actions"
import PaginatedHeader from "../PaginatedHeader/PaginatedHeader"

function Paginated({search}){
    const {videogames, videogamesSearch, filter, pagination, apiFilter} = useSelector(state => state);
    const dispatch = useDispatch()
    useEffect(() => {
            dispatch(allActions.clear())
            dispatch(allActions.resetPagination())
            dispatch(allActions.getAllVideogames(apiFilter))
            setShowMore(true)
    }, [dispatch]);

    let [showMore, setShowMore] = useState(false)

    function onShow(){
        window.scrollTo(0, 0);
        dispatch(allActions.morePagination());
    }
    function onHide(){
        window.scrollTo(0, 0);
        if(pagination > 15) dispatch(allActions.lessPagination())
    }
    /* eslint-disable*/
    return(
    <div className={styles.paginatedWrapper}>
            <PaginatedHeader search={search}/>
        <section className={styles.videogamesContainer}>
        {
            filter !== "" ? search ? videogamesSearch.length > 0 ? 
                videogamesSearch.filter((game) => [...game?.genres?.filter((genre) => genre.name === filter), ...game?.platforms?.filter((platform) => platform?.platform?.name === filter)].length > 0)
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
            videogamesSearch.length > 0 ? videogamesSearch.slice(pagination - 15, pagination).map(e => <VideogameCard
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
                search === true ? filter !== "" ? pagination > 
                videogamesSearch.filter((game) => [...game?.genres?.filter((genre) => genre.name === filter), ...game?.platforms?.filter((platform) => platform?.platform?.name === filter)].length > 0).length ?
                null : <a className={showMore === true ? styles.showMore : styles.showNone} onClick={() => onShow()}>Next Page</a> :
                pagination > videogamesSearch.length ? null : <a className={showMore === true ? styles.showMore : styles.showNone} onClick={() => onShow()}>Next Page</a> :
                pagination > videogames.length ? null : <a className={showMore === true ? styles.showMore : styles.showNone} onClick={() => onShow()}>Next Page</a>
            }
        </div>
    </div>
)}

export default Paginated;