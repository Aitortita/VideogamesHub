import styles from "./VideogameCreate.module.css";
import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import VideogameCreateCard from "../VideogameCreateCard/VideogameCreateCard";
import VideogameValidateCard from "../VideogameValidateCard/VideogameValidateCard";
import * as allActions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

function VideogameCreate(props){
    const { videogameCreate } = useSelector(state => state)
    const dispatch = useDispatch()
    const [flags, setFlags] = useState({
        flagName: false,
        flagDescription: false,
        flagLaunchDate: true,
        flagRating: true
    })
    const [flagGenre, setFlagGenre] = useState(false)
    const [flagPlatform, setFlagPlatform] = useState(false)
    const [genres, setGenres] = useState({
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
    })
    const [platforms, setPlatforms] = useState({
            'PC': false,
            'PlayStation 4': false,
            'Xbox One':false,
            'Nintendo Switch': false,
            'iOS': false,
            'Android': false
    })
    const [state, setState] = useState({
        name: "",
        description:"",
        launchDate: "",
        rating:"",
        image: null
    })

    useEffect(() => {
        Object.values(platforms).find((e) => e === true) ?  setFlagPlatform(true): setFlagPlatform(false);
        Object.values(genres).find((e) => e === true) ?  setFlagGenre(true): setFlagGenre(false);
    }, [platforms, genres])

    function handleGenre(e) {
        setGenres({...genres, [e.target.name]: e.target.checked})
        console.log(e.target.checked)
    }

    function handlePlatforms(e){
        setPlatforms({...platforms, [e.target.name]: e.target.checked})
        console.log(e.target.checked)
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
            flagName: false,
            flagDescription: false,
            flagLaunchDate: true,
            flagRating: true
        })
    }

    function validatorName(name){
        const validate = name.match(/[a-z]|[0-9]|[ ,-/]/gi); 
        if (name.length !== validate?.length) {
            return setFlags({...flags, flagName: false})
        }
        setFlags({...flags, flagName: true})
    }
    function validatorDescription(description){
        /*eslint-disable */
        const validate = description.match(/[\x00-\xFF]/g); 
        /*eslint-disable */
        if (description.length !== validate?.length) {
            return setFlags({...flags, flagDescription: false})
        }
        setFlags({...flags, flagDescription: true})
    }
    function validatorLaunchDate(launchDate){
        if(launchDate.length > 10) return setFlags({...flags, flagLaunchDate: false})
        if(launchDate === "") return setFlags({...flags, flagLaunchDate: true});
        const validate = launchDate.match(/[0-9]|[ \-,.]/g);
        if (launchDate.length !== validate?.length) {
            return setFlags({...flags, flagLaunchDate: false})
        }
        setFlags({...flags, flagLaunchDate: true})
    }
    function validatorRating(rating){
        if (rating === "") return setFlags({...flags, flagRating: true});
        if (rating > 100 || rating < 0) return setFlags({...flags, flagRating: false});
        const validate = rating.match(/[0-9]/g);
        if (rating.length !== validate?.length) {
            return setFlags({...flags, flagRating: false})
        }
        setFlags({...flags, flagRating: true})
    }
    return(
        <div>
            <Nav />
            <h1>You can create your own videogame</h1>
          <div className={styles.container}>
            <form className={styles.formulario} onSubmit={(e) => handleSubmit(e)}>
                <div className={styles.inputs}>
                <label htmlFor="name">Name*: </label>
                <input name="name" type="text" placeholder="your videogame's name" value={state.name} onChange={(e) => handleChange(e)}></input>
                <label htmlFor="description">Description*: </label>
                <input name="description" type="text" placeholder="your videogame's description" value={state.description} onChange={(e) => handleChange(e)}></input>
                <label htmlFor="rating">Rating: </label>
                <input name="rating" type="number" min="0" max="100" placeholder="your videogame's rating" value={state.rating} onChange={(e) => handleChange(e)}></input>
                <label htmlFor="launchDate">Launch Date: </label>
                <input name="launchDate" type="date" placeholder="your videogame's launch date" value={state.launchDate} onChange={(e) => handleChange(e)}></input>
                </div>
                    <div className={styles.genresContainer}>
                        <h4>Genres*: </h4>
                {
                    Object.keys(genres).map(genre => {
                        return(
                    <span key={genre}>
                        <input name={genre} type="checkbox" checked={genres[genre]} onChange={(e) => handleGenre(e)}/>
                        <label htmlFor={`${genre}`}> {genre} </label>
                    </span>
                        )})
                } 
                    </div>
                    <div className={styles.platformsContainer}>
                        <h4>Platforms*:</h4>
                {
                    Object.keys(platforms).map(platform => {
                        return(
                    <span key={platform}>
                        <input name={platform} type="checkbox" checked={platforms[platform]} onChange={(e) => handlePlatforms(e)}/>
                        <label htmlFor={`${platform}`}> {platform} </label>
                    </span>
                        )})
                }
                    </div>
                    <div className={styles.image}>
                <label>Image: </label>
                <input name="image" type="file" accept="image/*" onChange={(e) => handleImage(e)}></input>
                    </div>
                    <div className={styles.boton}>
                <button type="submit" className={styles.submit}>Submit</button>
                    </div>
            </form>
            <div className={styles.videogameCreateCard}>
                <VideogameCreateCard
                data={state}
                />
            </div>
            <div className={styles.videogameValidateCard}>
                <VideogameValidateCard 
                flags={flags}
                flagGenre={flagGenre}
                flagPlatform={flagPlatform}
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