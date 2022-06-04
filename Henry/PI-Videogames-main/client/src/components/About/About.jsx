import styles from "./About.module.css";
import React from "react";
import Nav from "../Nav/Nav";

export default function About(props) {
    return(
        <div className={styles.wrapper}>
            <Nav />
                <h1 className={styles.title}>Thanks for checking VideogamesHUB, you are awesome 😀</h1>
            <div className={styles.container}>
                <h1 className={styles.text}>This is the project I had to do at SoyHenry bootcamp, I was asked to make a videogame
                page that uses Rawg api and it's own DB using Sequelize and postgreSQL, I was limited to only using 4 endpoints for
                the Rawg api, forcing me to implement my own filtering/sorting methods, where i wanted to use purely my problem solving skills
                without relying on youtube or having someone tell me how to do it, that's why through trial and error, and many hours of figuring 
                out how I wanted to implement them, I came with some answers, whom not long after implementing I realized that were suboptimal and could
                do much better, mainly because my page faces a lot of asynchronous calls overlaping each other when you click buttons pretty fast, and whoever
                ends last get's rendered, even though React's asynchronous api stack was one of my worst enemies, I think the trickiest part was implementing the css
                which prior to starting this project I had never learned, in conclusion I learned a lot of better practices by just plain coding the project,
                and will now continue to make it better and adjust the page in order to solve all the problems I have yet not solved, if you want to check the
                repository here is the {<a href="https://github.com/Aitortita/VideogamesHub" rel="noopener noreferrer" target="_blank">Link</a>}
                </h1>  
            </div>
        </div>
    )
}