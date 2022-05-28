import styles from "./VideogameValidateCard.module.css";
import React from "react";
import { useSelector } from "react-redux";

function VideogameValidateCard(props){
    const { exactVideogame } = useSelector(state => state);
    const {flagName, flagRating, flagDescription, flagLaunchDate } = props.flags;
    const { flagGenre, flagPlatform } = props
    function ternary() {
        if (flagName === true && flagRating === true && flagDescription === true && flagLaunchDate === true && flagGenre === true && flagPlatform === true) return true;
        return false
    }
    return(
        <div className={styles.text}>
            <h3>{exactVideogame}</h3>
            {
                ternary() ? <h1>EVERYTHING OK 😊</h1> :
            
                flagName !== true ? <h4>Name can't be empty or have rare characters like 字</h4> : 
            
                flagDescription !== true ? <h4>Description is not correctly written</h4> : 
            
                flagRating !== true ? <h4>Rating must be a number between 0 and 100</h4> :
            
                flagLaunchDate !== true ? <h4>Launch date is expected to be realistic 😐</h4> : 

                flagPlatform !== true ? <h4>You must at least put one platform</h4> :
                
                flagGenre !== true ? <h4>You must at least put one genre</h4> : null
            }
        </div>
    )
}



export default VideogameValidateCard;