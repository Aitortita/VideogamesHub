import styles from "./Resting.module.css";
import React from "react";
import { useNavigate } from "react-router-dom";


export default function Resting(props){
    const navigate = useNavigate()
    return(
        <div className={styles.background}>
            <div className={styles.container}>
            <h1>It seems you've got lost, but don't worry, you can rest here, and whenever you feel like it click the fire</h1>
            <div className={styles.fire} onClick={() => navigate("/home")}/>
            </div>
        </div>
    )
}
