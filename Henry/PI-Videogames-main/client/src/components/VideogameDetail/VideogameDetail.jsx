import "./VideogameDetail.css";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as allActions from "../../redux/actions/index";
import Nav from "../Nav/Nav";
import { useLocation } from "react-router-dom";

function VideogameDetail(props){
    const dispatch = useDispatch();
    const videogame = useSelector(state => state.videogame);
    const {id} = useLocation().state;
    useEffect(() => {
        dispatch(allActions.getVideogame(id))
    }, [])
    return (
        <div>
            <Nav />
            <div>
            <h1>Videojuego: {videogame.name}</h1>
            <h1>launchDate: {videogame.launchDate}</h1>
            <h1>platform: {videogame.platform}</h1>
            <h1>rating: {videogame.rating}</h1>
            <h1>description: {videogame.description}</h1>
            <h1>id: {videogame.id}</h1>
            </div>
        </div>
    )
}












export default VideogameDetail;