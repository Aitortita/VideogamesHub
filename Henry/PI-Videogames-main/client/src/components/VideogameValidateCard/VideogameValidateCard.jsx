import styles from "./VideogameValidateCard.module.css";
import React from "react";
import { useSelector } from "react-redux";

function VideogameValidateCard(props){
    const { videogameCreated } = useSelector(state => state)
    const {flagName, flagRating, flagDescription, flagLaunchDate} = props.flags;
    function ternary() {
        if (flagName === 1 && flagRating === 1 && flagDescription === 1 && flagLaunchDate === 1) return true;
        return false
    }
    return(
        <div className={styles.text}>
            {
                videogameCreated ? <h1>Your game has been created ☜(ﾟヮﾟ☜)</h1> :
               
                ternary() ? <h1>EVERYTHING OK 😊</h1> :
            
                flagName !== 1 ? <h4>Name can't be empty or have rare characters like 字</h4> : 
            
                flagDescription !== 1 ? <h4>Description is not correctly written</h4> : 
            
                flagRating !== 1 ? <h4>Rating expected to only have a number</h4> :
            
                flagLaunchDate !== 1 ? <h4>Launch date is expected to be realistic 😐</h4> : null
            }
        </div>
    )
}



export default VideogameValidateCard;