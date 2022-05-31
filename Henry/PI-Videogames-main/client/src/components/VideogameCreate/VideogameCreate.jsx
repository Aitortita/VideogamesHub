import styles from "./VideogameCreate.module.css";
import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import VideogameCreateCard from "../VideogameCreateCard/VideogameCreateCard";
import VideogameValidateCard from "../VideogameValidateCard/VideogameValidateCard";
import * as allActions from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function VideogameCreate(props){
    useEffect(()=>{
        dispatch(allActions.getAllGenresAndPlatforms())
    },
    /* eslint-disable */
    [])
    /* eslint-disable */
    const dispatch = useDispatch()
    const { platforms, exactVideogame } = useSelector(state=> state)
    const [flags, setFlags] = useState({
        flagName: false,
        flagCorrectName: false,
        flagDescription: false,
        flagLaunchDate: true,
        flagRating: true,
    })
    const [flagGenre, setFlagGenre] = useState(false)
    const [flagPlatform, setFlagPlatform] = useState(false) 
    const [localGenres, setGenres] = useState({
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
    const [localPlatforms, setPlatforms] = useState([])
    const [state, setState] = useState({
        name: "",
        description:"",
        launchDate: "",
        rating:"",
        image: null
    })
    useEffect(()=>{
        if(exactVideogame === "Name is free") return setFlags({...flags, flagCorrectName: true});
        setFlags({...flags, flagCorrectName: false})
    },[state.name])
    useEffect(() => {
        localPlatforms.length > 0 ?  setFlagPlatform(true): setFlagPlatform(false);
        Object.values(localGenres).find((e) => e === true) ?  setFlagGenre(true): setFlagGenre(false);
    },[localPlatforms, localGenres])
    function handleGenre(e) {
        setGenres({...localGenres, [e.target.name]: e.target.checked})
    }
    function handlePlatforms({target}){
        let value = Array.from(target.selectedOptions,
        (option) => option.value);
        setPlatforms(value)
    }
    function handleChange({target}){
        if (target.name === "name" && target.value !== "") dispatch(allActions.getExactVideogame(target.value))
        setState({...state, [target.name]: `${target.value}`})
        switch(target.name){
            case "name":
                validatorName(target.value)
                break;
            case "description":
                validatorDescription(target.value)
                break;
            case "launchDate":
                validatorLaunchDate(target.value)
                break;
            case "rating":
                validatorRating(target.value)
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
        if (e.target.files[0]) return reader.readAsDataURL(e.target.files[0])
    }
    function handleSubmit(e){
        e.preventDefault()
        if(flags.flagName !== true || flags.flagDescription !== true || flags.flagLaunchDate !== true || flags.flagRating !== true || flagGenre !== true || flagPlatform !== true){
            return alert("You must fullfill all conditions before submitting")
        }
        let launchDate = undefined
        if (state.launchDate !== "") launchDate = state.launchDate;
        let rating = undefined
        if (state.rating !== "") rating = state.rating;
        const platform = localPlatforms;
        const genre = Object.entries(localGenres).filter(platform => platform[1] === true).map(e => e[0]);
        let body = {
            name: state.name,
            description: state.description,
            launchDate,
            rating,
            platform,
            image:state.image,
            genre
        }
        dispatch(allActions.createVideogame(body))
        setState({
            name: "",
            description:"",
            launchDate: "",
            rating:"",
            image: null,
        })
        setFlags({
            flagName: false,
            flagDescription: false,
            flagLaunchDate: true,
            flagRating: true
        })
        setFlagGenre(false)
        setFlagPlatform(false)
        setGenres({
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
        setPlatforms([])
    }
    function validatorName(name){
        const validate = name.match(/[a-z]|[0-9]|[ ,-/]/gi); 
        if (name.length !== validate?.length) {
            return setFlags({...flags, flagName: false})
        }
        setFlags({...flags, flagName: true})
    }
    function validatorDescription(description){
        if(description.length > 300) return setFlags({...flags, flagDescription: false});
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
        <div className={styles.wrapper}>
            <Nav />
            <h1 className={styles.title}>You can create your own videogame</h1>
          <div className={styles.container}>
                <form className={styles.formularioContainer} onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.mainForm}>
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
                                <h4 style={{marginTop: 5, marginBottom: 5}}>Genres*: </h4>
                                <div className={styles.checkboxes}>
                        {
                            Object.keys(localGenres).map(genre => {
                                return(
                            <span key={genre}>
                                <input name={genre} type="checkbox" checked={localGenres[genre]} onChange={(e) => handleGenre(e)}/>
                                <label htmlFor={`${genre}`}> {genre} </label>
                            </span>
                                )})
                        } 
                                </div>
                            </div>
                            <div className={styles.platformsContainer}>
                                <h4>Platforms*:</h4>
                                <select multiple={true} onChange={(e) => handlePlatforms(e)}>
                        {
                                    platforms.map(({name}) => {
                                    return(
                                        <option key={name} name={name} value={name} onChange={(e) => handlePlatforms(e)}>{name}</option>
                                    )})
                        }
                                </select>
                            </div>
                            <div className={styles.imageContainer}>
                        <label>Image: </label>
                        <input name="image" type="file" accept="image/*" placeholder="hola" onChange={(e) => handleImage(e)}></input>
                            </div>
                            <div className={styles.botonContainer}>
                        <button type="submit" className={styles.submit}>Submit</button>
                            </div>
                </form>
              <div className={styles.videogameCreateCard}>
                    <VideogameCreateCard
                    data={state}
                    genres={Object.entries(localGenres).filter(platform => platform[1] === true).map(e => e[0])}
                    platforms={localPlatforms}
                    />
              </div>
              <div className={styles.videogameValidateCard}>
                    <VideogameValidateCard 
                    flags={flags}
                    flagGenre={flagGenre}
                    flagPlatform={flagPlatform}
                    />
              </div>
          </div>
        </div>
    )
}