import styles from "./VideogameCreate.module.css";
import React, { useState } from "react";
import Nav from "../Nav/Nav";
import VideogameCreateCard from "../VideogameCreateCard/VideogameCreateCard";
import VideogameValidateCard from "../VideogameValidateCard/VideogameValidateCard";
import * as allActions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function VideogameCreate(props){
    const { videogameCreate } = useSelector(state => state)
    const dispatch = useDispatch()
    const [flags, setFlags] = useState({
        flagName: 0,
        flagDescription: 0,
        flagLaunchDate: 1,
        flagRating: 1,
        flagGenres: 0
    })
    const [state, setState] = useState({
        name: "",
        description:"",
        launchDate: "",
        rating:"",
        image: null,
        platform: '',
        genres: {
            'Action': false,
            'Indie': false,
            'Adventure': false,
            'RPG': false,
            'Strategy': false,
            'Shooter': false,
            'Casual': false,
            'Simulation': false,
            'Puzzle': false,
            'Arcade': false,
            'Platformer': false,
            'Racing': false,
            'Massively Multiplayer': false,
            'Sports': false,
            'Fighting': false,
            'Family': false,
            'board games': false,
            'Educational': false,
            'Card': false,
        },
        platforms: {
            'PC': false,
            'PlayStation 4': false,
            'Xbox One':false,
            'Nintendo Switch': false,
            'iOS': false,
            'Android': false
        }
    })
     function handleGenre(e){
        setState({...state, genres : {...state.genres, [e.target.name]: e.target.checked}})
    }
    function handlePlatforms(e){
        setState({...state, platforms : {...state.platforms, [e.target.name]: e.target.checked}})
    }

    function handleChange(e){
        setState({...state, [e.target.name]: `${e.target.value}`})
        switch(e.target.name){
            case "name":
                validatorName(e.target.value)
                break;
            case "description":
                validatorDescription(e.target.value)
                break;
            case "launchDate":
                validatorLaunchDate(e.target.value)
                break;
            case "rating":
                validatorRating(e.target.value)
                break;
            default: return;
        }
    }
    function handleImage(e){
        let reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2){
                setState({...state, image: reader.result})
            }
            return
        }
        if (e.target.files[0]) return reader.readAsDataURL(e.target.files[0]);
        return
    }
    
    function handleSubmit(e){
        e.preventDefault()
        if (flags.flagName !== 1 || flags.flagDescription !== 1 || flags.flagLaunchDate !== 1 || flags.flagRating !== 1) {
            return console.log('algo está mal')
        }
        console.log("bien ahí loco")
        dispatch(allActions.createVideogame(state))
        setState({
            name: "",
            description:"",
            launchDate: "",
            rating:"",
            image: null,
            platform: "",
            genres: {
                'Action': false,
                'Indie': false,
                'Adventure': false,
                'RPG': false,
                'Strategy': false,
                'Shooter': false,
                'Casual': false,
                'Simulation': false,
                'Puzzle': false,
                'Arcade': false,
                'Platformer': false,
                'Racing': false,
                'Massively Multiplayer': false,
                'Sports': false,
                'Fighting': false,
                'Family': false,
                'board games': false,
                'Educational': false,
                'Card': false,
            },
            platforms: {
                'PC': false,
                'PlayStation 4': false,
                'Xbox One':false,
                'Nintendo Switch': false,
                'iOS': false,
                'Android': false
            }
        })
        setFlags({
            flagName: 0,
            flagDescription: 0,
            flagLaunchDate: 1,
            flagRating: 1,
            flagGenres: 0
        })
    }

    function validatorName(name){
        const validate = name.match(/[a-z]|[0-9]|[ ,-/]/gi); 
        if (name.length !== validate?.length) {
            return setFlags({...flags, flagName: 0})
        }
        setFlags({...flags, flagName: 1})
    }
    function validatorDescription(description){
        /*eslint-disable */
        const validate = description.match(/[\x00-\xFF]/g); 
        /*eslint-disable */
        if (description.length !== validate?.length) {
            return setFlags({...flags, flagDescription: 0})
        }
        setFlags({...flags, flagDescription: 1})
    }
    function validatorLaunchDate(launchDate){
        if(launchDate.length > 10) return setFlags({...flags, flagLaunchDate: 0})
        if(launchDate === "") return setFlags({...flags, flagLaunchDate: 1});
        const validate = launchDate.match(/[0-9]|[ \-,.]/g);
        if (launchDate.length !== validate?.length) {
            return setFlags({...flags, flagLaunchDate: 0})
        }
        setFlags({...flags, flagLaunchDate: 1})
    }
    function validatorRating(rating){
        if (rating === "") return setFlags({...flags, flagRating: 1});
        const validate = rating.match(/[0-9]/g);
        if (rating.length !== validate?.length) {
            return setFlags({...flags, flagRating: 0})
        }
        setFlags({...flags, flagRating: 1})
    }
    return(
        <div>
            <Nav />
            <h1>You can create your own videogame</h1>
          <div className={styles.container}>
            <form className={styles.formulario} onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.inputs}>
                <label htmlFor="name">Name: </label>
                <input name="name" type="text" placeholder="your videogame's name" value={state.name} onChange={(e) => handleChange(e)}></input>
                <label htmlFor="description">Description: </label>
                <input name="description" type="text" placeholder="your videogame's description" value={state.description} onChange={(e) => handleChange(e)}></input>
                <label htmlFor="rating">Rating: </label>
                <input name="rating" type="text" placeholder="your videogame's rating" value={state.rating} onChange={(e) => handleChange(e)}></input>
                <label htmlFor="launchDate">Launch Date: </label>
                <input name="launchDate" type="date" placeholder="your videogame's launch date" value={state.launchDate} onChange={(e) => handleChange(e)}></input>
                </div>
                <div className={styles.checkboxContainer}>
                {
                    Object.keys(state.genres).map(genre => {
                        return(
                    <span key={genre}>
                        <input name={genre} type="checkbox" checked={state.genres[genre]} onChange={(e) => handleGenre(e)}/>
                        <label htmlFor={`${genre}`}> {genre} </label>
                    </span>
                        )})
                } 
                {
                    Object.keys(state.platforms).map(platform => {
                        return(
                    <span key={platform}>
                        <input name={platform} type="checkbox" checked={state.platforms[platform]} onChange={(e) => handlePlatforms(e)}/>
                        <label htmlFor={`${platform}`}> {platform} </label>
                    </span>
                        )})
                }
                </div>
                <label>Image: </label>
                <input name="image" type="file" accept="image/*" onChange={(e) => handleImage(e)}></input>
                <button type="submit" className={styles.submit}>Submit</button>
            </form>
            <div className={styles.videogameCreateCard}>
                <VideogameCreateCard
                data={state}
                />
            </div>
            <div className={styles.videogameValidateCard}>
                <VideogameValidateCard 
                flags={flags}
                />
            </div>
                {
                    videogameCreate ? <h1>Created Succesfully</h1> : null
                }
          </div>
        </div>
    )
}







export default VideogameCreate;