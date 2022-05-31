import styles from "./About.module.css";
import React from "react";
import Nav from "../Nav/Nav";

function About(props) {
    return(
        <div className={styles.wrapper}>
            <Nav />
                <h1 className={styles.title}>Thanks for checking VideogamesHUB, you are awesome 😀</h1>
            <div className={styles.container}>
                <h1 className={styles.text}>This is the project I had to do for my bootcamp at SoyHenry,
                by doing so I learned a lot about react, react-redux, express, postgreSQL, and how relational data bases work,
                prior to my experience at SoyHenry I had never even set a variable in a programming language, so it goes to show
                how this bootcamp really teaches you, of course it was not the only factor, I actually googled a lot and watched
                many hours long videos about each frameworks flow to add up to the bootcamp and complement the weak points of the
                bootcamp, nonetheless I think it was a great experience and even though this project feels kind of an espaghetti code
                (not gonna lie), I am not going to change it or refactor it, as it was my first attempt at doing a web page and I
                want to remain it as a memory, here you have the {<a href="https://github.com/Aitortita" rel="noopener noreferrer" target="_blank">Repository </a>}
                if you want to check it</h1>  
            </div>
        </div>
    )
}


export default About;