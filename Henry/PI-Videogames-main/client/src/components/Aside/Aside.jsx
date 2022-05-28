import styles from "./Aside.module.css"; 
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as allActions from "../../redux/actions";

function Aside(props){
    const {genres, platforms} = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(()=> {
        dispatch(allActions.getAllGenresAndPlatforms())
    }, 
    /* eslint-disable */
    [dispatch])
    /* eslint-disable */

    const [sorts, setSorts] = useState();
    const navigate = useNavigate();

    function handleGenre(e) {
        console.log(e.target)
    }
    function handlePlatform(e) {
        console.log(e)
    }





    return(
        <aside className={styles.asideWrapper}>
            <div className={styles.aside}>
                <h1 className={styles.landingPage} onClick={()=> navigate("/")}>Landing page</h1>
                <h1>New Releases</h1>
                    {/* eslint-disable */}
                <ul>
                    <li><a>Landing page</a></li>
                    <li><a>Most liked</a></li>
                    <li><a>This month</a></li>
                    <li><a>Next month</a></li>
                    <li><a>Next Next month</a></li>
                    <li><a>Next Next Next month</a></li>
                    <li><a>Incoming...</a></li>
                </ul>
                <h2>Filters</h2>
                <div className={styles.filters}>
                <ul>
                    <li>
                        <label htmlFor="genres">Genres: </label>
                        <select className={styles.filter} name="genres" onChange={(e)=> handleGenre(e)}>
                            {
                                genres?.map(genre => <option key={genre.name} value={genre.name}>{genre.name}</option>)
                            }
                        </select>
                        <label htmlFor="platforms">Platforms: </label>
                        <select className={styles.filter} name="platforms" onChange={(e)=> handlePlatform(e)}>
                            {
                                platforms?.map(platform => <option key={platform.name} value={platform.name}>{platform.name}</option>)
                            }
                        </select>
                    </li>
                </ul>
                </div>
                <h2>Sorts</h2>
                <ul>
                    <li><a>hola</a></li>
                </ul>
                <h2>Creating</h2>
                <ul>
                    <li><a href="/create/videogame"> Create a videogame</a></li>
                </ul>
            </div>

            <div className="clearfix"></div>

















        </aside>
    )
}




export default Aside;