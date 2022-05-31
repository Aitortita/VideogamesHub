import styles from "./VideogameValidateCard.module.css";
import React from "react";

export default function VideogameValidateCard(props){
    const { flagName, flagRating, flagDescription, flagLaunchDate, flagCorrectName } = props.flags;
    const { flagGenre, flagPlatform } = props;

    return(
        <div className={styles.container}>
            {
                flagName !== true ? <h4>Name can't be empty or have rare characters like 字</h4> : 

                flagCorrectName !== true ? <h2>Name is not free</h2> :
            
                flagDescription !== true ? <h4>Description is not correctly written</h4> : 
            
                flagRating !== true ? <h4>Rating must be a number between 0 and 100</h4> :
            
                flagLaunchDate !== true ? <h4>Launch date is expected to be realistic 😐</h4> : 

                flagPlatform !== true ? <h4>You must at least put one platform</h4> :
                
                flagGenre !== true ? <h4>You must at least put one genre</h4> : 
                
                <h1>EVERYTHING OK 😊</h1> 
            }
        </div>
    )
}