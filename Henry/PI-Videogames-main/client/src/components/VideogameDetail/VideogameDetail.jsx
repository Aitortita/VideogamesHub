import "./VideogameDetail.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as allActions from "../../redux/actions/index";
import Nav from "../Nav/Nav";
import { useLocation } from "react-router-dom";
import Aside from "../Aside/Aside";

function VideogameDetail(props){
    const dispatch = useDispatch()
    const videogame = useSelector(state => state.videogame);
    const {id} = useLocation().state;
    useEffect(() => {
        dispatch(allActions.getVideogame(id));
        dispatch(allActions.unFilterVideogames())
    }, [dispatch, id])
    return (
        <div>
            <Nav />
            <Aside />
            <div>
            <h1>Videogame: {videogame.name}</h1>
            <h1>Launch date: {videogame.launchDate}</h1>
            <h1>
                Platforms:
                <h5>
                    {videogame?.platforms?.map(platforms =>`${platforms.platform.name}, `)}
                </h5>
            </h1>
            <h1>Rating: {videogame.rating}</h1>
            <h1>Description: {videogame.description}</h1>
            <h1>Genres: <h5>{videogame?.genres?.map(genre => `${genre.name}, `)}</h5></h1>
            <img src={videogame.background_image} alt={`${videogame.name}`}/>
            </div>
        </div>
    )
}












export default VideogameDetail;