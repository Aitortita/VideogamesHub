import styles from "./Landing.module.css";
import React from "react";
import {useNavigate} from "react-router-dom";
import VideogamesHub from "../../images/VideogamesHubLanding.png"

function Landing(props){
    const navigate = useNavigate();
return (
    <div className={styles.background}>
        <div className={styles.imageContainer}>
        <img src={VideogamesHub} className={styles.image} alt="VideogamesHub" onClick={() => navigate("/home")}/>
        </div>
    </div>
    )
}




export default Landing;