import styles from "./Nav.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearFilters, unSearchVideogames, resetPagination, setDisplay, searchVideogame } from "../../redux/videogamesSlice/videogamesSlice";

export default function Nav(props){
    const {status} = useSelector(({videogames}) => videogames)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');

    function typing({target}){
        setName(target.value)
    }

    function search(e){
        if (status === "loading") return
        e.preventDefault()
        dispatch(clearFilters())
        dispatch(unSearchVideogames())
        dispatch(resetPagination())
        dispatch(setDisplay("block"))
        dispatch(searchVideogame({name}))
        navigate('/search')
        setName('')
    }
    return(
        <nav className={styles.navWrapper}>
            <div className={styles.nav}>
                <a className={styles.iconContainer} href="/home"/>{/* eslint-disable-line */}
                <div className={styles.searchbarContainer}>
                    <form className={styles.searchbarForm} onSubmit={(e)=>search(e)}>
                        <input type="text" placeholder="Videogame..." value={name} className={styles.searchbar} onChange={(e) => typing(e)}/>
                    </form>
                </div>
                <div className={styles.aboutWrapper}>
                    <a href="/about" className={styles.about}>About</a>
                    <a href="https://www.linkedin.com/in/javier-aitor-ezcurra-503200230/" target="_blank" rel="noopener noreferrer" className={styles.linkedin}>Linkedin</a>
                </div>
            </div>
        </nav>
    )
}
