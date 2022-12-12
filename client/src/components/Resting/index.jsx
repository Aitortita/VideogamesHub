import styles from "./Resting.module.css";
import React from "react";


export default function Resting(props){
    return(
        <div className={styles.background}>
            <div className={styles.container}>
            <h1>It seems you've got lost, but don't worry, you can rest here, and whenever you feel like it click the fire</h1>
            <a href="/home" className={styles.fire}/> {/* eslint-disable-line */}
            </div>
        </div>
    )
}
