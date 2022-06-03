import styles from "./Nav.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as allActions from "../../redux/actions";
import { useDispatch, useSelector} from "react-redux";
import icon from "../../images/VideogamesHub.png"

export default function Nav(props){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { apiFilter } = useSelector(state => state)
    const [name, setName] = useState('');

    function typing(e){
        setName(e.target.value)
    }

    function iconClick(){
        dispatch(allActions.resetPagination())
        dispatch(allActions.clearFilters())
        navigate("/home")
    }

    function search(e){
        e.preventDefault()
        dispatch(allActions.resetPagination())
        dispatch(allActions.clearFilters())
        dispatch(allActions.unSearchVideogames())
        dispatch(allActions.searchVideogame(apiFilter, name))
        navigate('/search')
        setName('')
    }
    return(
        <nav className={styles.navWrapper}>
            <div className={styles.nav}>
                <div className={styles.iconContainer}>
                    <img src={icon} className={styles.icon} alt="Home" onClick={()=> iconClick()}/>
                </div>
                <form className={styles.searchbarForm} onSubmit={(e)=>search(e)}>
                    <input type="text" placeholder="Videogame..." value={name} className={styles.searchbar} onChange={(e) => typing(e)}/>
                </form>
                <div className={styles.aboutWrapper}>
                    <a href="/about" className={styles.about}>About</a>
                    <a href="https://www.linkedin.com/in/javier-aitor-ezcurra-503200230/" target="_blank" rel="noopener noreferrer" className={styles.linkedin}>Linkedin</a>
                </div>
            </div>
        </nav>
    )
}
