import styles from "./VideogameValidateCard.module.css";
import React from "react";
import { useSelector } from "react-redux";

export default function VideogameValidateCard(props){
    const { flagName, flagRating, flagDescription, flagLaunchDate, flagCorrectName } = props.flags;
    const { flagGenre, flagPlatform } = props;
    const { videogameCreated } = useSelector(({videogames}) => videogames)

    return(
        <div className={styles.wrapper}>
            <div className={styles.container}>
            {
                videogameCreated ? <h1>Your videogame was created 😄</h1> :

                flagName !== true ? <h1>Name only accepts ASCII, and can't have more than 50 digits</h1> : 

                flagCorrectName !== true ? <h1>Name is not free</h1> :
            
                flagDescription !== true ? <h1>Description can't be empty and shouldn't be longer than 300 characters</h1> : 
            
                flagRating !== true ? <h1>Rating must be a number between 0 and 100</h1> :
            
                flagLaunchDate !== true ? <h1>Launch date is expected to be realistic 😐</h1> : 

                flagPlatform !== true ? <h1>You must put between one and ten platforms</h1> :
                
                flagGenre !== true ? <h1>You must put between one and five genres</h1> : 
                
                <h1>EVERYTHING OK 😊</h1> 
            }
            </div>
        </div>
    )
}