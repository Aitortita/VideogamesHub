import styles from "./VideogameCreate.module.css";
import React, { useEffect, useState } from "react";
import Nav from "../Nav/Nav";
import VideogameCreateCard from "../VideogameCreateCard/VideogameCreateCard";
import VideogameValidateCard from "../VideogameValidateCard/VideogameValidateCard";
import { getAllGenresAndPlatforms, getExactVideogame, createVideogame, unCreateVideogame, unVideogame } from "../../redux/videogamesSlice/videogamesSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function VideogameCreate(props){
    const { platforms, genres, checkVideogame, videogameCreated } = useSelector(({videogames})=> videogames)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    useEffect(()=>{
        dispatch(getAllGenresAndPlatforms())
        dispatch(unCreateVideogame())
    },[])// eslint-disable-line

    let validators = {
        name: function (name){
            if (name.length > 50) return setFlags({...flags, flagName: false});
            const validate = name.match(/[a-z]|[0-9]|[ ,-]/gi); 
            if (name.length !== validate?.length) setFlags({...flags, flagName: false})
            else setFlags({...flags, flagName: true})
        },
        description: function (description){
            if(description.length > 300) return setFlags({...flags, flagDescription: false});
            const validate = description.match(/[\x00-\xFF]/g); // eslint-disable-line
            if (description.length !== validate?.length) setFlags({...flags, flagDescription: false})
            else setFlags({...flags, flagDescription: true})
        },
        launchDate: function (launchDate){
            if(launchDate.length > 10) return setFlags({...flags, flagLaunchDate: false})
            if(launchDate === "") return setFlags({...flags, flagLaunchDate: true});
            const validate = launchDate.match(/[0-9]|[ \-,.]/g);
            if (launchDate.length !== validate?.length)setFlags({...flags, flagLaunchDate: false})
            else setFlags({...flags, flagLaunchDate: true})
        },
        rating: function (rating){
            if (rating === "") return setFlags({...flags, flagRating: true});
            if (rating.length > 4) return setFlags({...flags, flagRating: false})
            if (rating > 5 || rating < 0) return setFlags({...flags, flagRating: false});
            if ((/([0-9]+(\.|,)?[0-9]*|(\.|,)[0-9]+)$/g).test(rating)) setFlags({...flags, flagRating: true})
            else setFlags({...flags, flagRating: false})
        },
        image: function (image){
            if (image.length > 254) return setFlags({...flags, flagImage:false})
            if (image === "") return setFlags({...flags, flagImage: true})
            if(/(http(s?):)([/|.|\w|\s|-])*.(?:jpg|gif|png)/g.test(image)) setFlags({...flags, flagImage: true})
            else setFlags({...flags, flagImage: false})
        }
    }

    const [flags, setFlags] = useState({
        flagName: false,
        flagCorrectName: true,
        flagDescription: false,
        flagLaunchDate: true,
        flagRating: true,
        flagImage: false,
    })

    const [flagGenre, setFlagGenre] = useState(false)

    const [flagPlatform, setFlagPlatform] = useState(false) 

    const [localGenres, setGenres] = useState([])

    function handleGenre({target}) {
        setGenres({...localGenres, [target.name]: target.checked})
    }

    const [localPlatforms, setPlatforms] = useState([])

    const [state, setState] = useState({
        name: "",
        description:"",
        launchDate: "",
        rating:"",
        image: ""
    })

    useEffect(()=>{
        if(checkVideogame === "Name is free") return setFlags({...flags, flagCorrectName: true});
        setFlags({...flags, flagCorrectName: false})
    },[checkVideogame]) // eslint-disable-line

    useEffect(() => {
        localPlatforms.length > 0 && localPlatforms.length < 11?  setFlagPlatform(true): setFlagPlatform(false);
        Object.values(localGenres).filter(e => e === true).length > 0 && Object.values(localGenres).filter(e => e === true).length < 6 ? setFlagGenre(true): setFlagGenre(false);
    },[localPlatforms, localGenres])


    function handlePlatforms({target}){
        let value = Array.from(target.selectedOptions,
        (option) => option.value);
        setPlatforms(value)
    }

    function handleChange({target}){
        if (target.name === "name") dispatch(getExactVideogame(target.value))
        setState({...state, [target.name]: target.value})
        validators[target.name](target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(flags.flagName !== true || flags.flagDescription !== true || flags.flagLaunchDate !== true || flags.flagRating !== true || flagGenre !== true || flagPlatform !== true){
            return alert("You must fullfill all conditions before submitting")
        }
        let launchDate = undefined
        if (state.launchDate !== "") launchDate = state.launchDate;
        let rating = undefined
        if (state.rating !== "") rating = state.rating;
        const genre = Object.entries(localGenres).filter(genre => genre[1] === true).map(e => e[0]);
        let body = {
            name: state.name,
            description: state.description,
            launchDate,
            rating,
            platform: localPlatforms,
            image:state.image,
            genre
        }
        dispatch(createVideogame(body))
        setState({name: "",description:"",launchDate: "",rating:"",image: "",})
        setFlags({
            flagName: false,
            flagDescription: false,
            flagLaunchDate: true,
            flagRating: true
        })
        setFlagGenre(false)
        setFlagPlatform(false)
        setGenres([])
        setPlatforms([])
    }

    useEffect(()=>{
        if (videogameCreated === null) return;
        dispatch(unVideogame())
        localStorage.setItem(videogameCreated.name, JSON.stringify(videogameCreated.id))
        navigate(`/videogame/${videogameCreated.name}`)
                
    }, [videogameCreated])
    
    return(
        <div className={styles.wrapper}>
            <Nav />
            <h1 className={styles.title}>You can create your own videogame</h1>
          <div className={styles.container}>
                <div className={styles.videogameValidateCard}>
                    <VideogameValidateCard 
                    flags={flags}
                    flagGenre={flagGenre}
                    flagPlatform={flagPlatform}
                    />
                </div>
                <form className={styles.formularioContainer} onSubmit={(e) => handleSubmit(e)}>
                    <div className={styles.mainForm}>
                        <label htmlFor="name">Name*: </label>
                        <input name="name" type="text" placeholder="your videogame's name" value={state.name} onChange={(e) => handleChange(e)}></input>
                        <label htmlFor="description">Description*: </label>
                        <input name="description" type="text" placeholder="your videogame's description" value={state.description} onChange={(e) => handleChange(e)}></input>
                        <label htmlFor="rating">Rating: </label>
                        <input name="rating" type="number" placeholder="your videogame's rating" value={state.rating} onChange={(e) => handleChange(e)}></input>
                        <label htmlFor="launchDate">Launch Date: </label>
                        <input name="launchDate" type="date" placeholder="your videogame's launch date" value={state.launchDate} onChange={(e) => handleChange(e)}></input>
                        <label>Image: </label>
                        <input name="image" value={state.image} type="text" placeholder="image..." onChange={(e) => handleChange(e)}></input>
                    </div>
                        <div className={styles.genresContainer}>
                                <h4 style={{marginTop: 5, marginBottom: 5}}>Genres*: </h4>
                            <div className={styles.checkboxesContainer}>
                        {
                            genres?.map(genre => {
                                return(
                            <span key={genre.id}>
                                <label htmlFor={`${genre.name}`} className={styles.genreCheckbox}>
                                <input className={styles.checkbox} name={genre.name} id={genre.name} type="checkbox" checked={localGenres[genre.name]} onChange={(e) => handleGenre(e)}/>
                                {genre.name} </label>
                            </span>
                            )})
                        } 
                            </div>
                        </div>
                        <div className={styles.lastContainer}>
                            <div className={styles.platformsContainer}>
                                <h4>Platforms*:</h4>
                                <select multiple={true} onChange={(e) => handlePlatforms(e)}>
                        {
                                    platforms?.map(({name}) => {
                                    return(
                                        <option key={name} name={name} value={name} onChange={(e) => handlePlatforms(e)}>{name}</option>
                                    )})
                        }
                                </select>
                            </div>
                            <div className={styles.submitContainer}>
                                <button type="submit" className={styles.submit}>Submit</button>
                            </div>
                        </div>
                </form>
              <div className={styles.videogameCreateCard}>
                    <VideogameCreateCard
                    data={state}
                    genres={Object.entries(localGenres).filter(platform => platform[1] === true).map(e => e[0])}
                    platforms={localPlatforms}
                    />
              </div>
          </div>
        </div>
    )
}