import styles from "./Nav.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as allActions from "../../redux/actions";
import { useDispatch} from "react-redux";
import icon from "../../images/VideogamesHubHD.png"

function Nav(props){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');

    function typing(e){
        setName(e.target.value)
    }

    function search(e){
        e.preventDefault()
        dispatch(allActions.clear())
        dispatch(allActions.searchVideogame(name))
        navigate('/search')
        setName('')
    }
    function linkedin(){
        window.open("https://www.linkedin.com/in/javier-aitor-ezcurra-503200230/", '_blank', 'noopener,noreferrer');
    }
    return(
        <nav className={styles.navWrapper}>
            <div className={styles.nav}>
                <div className={styles.iconContainer}>
                    <img src={icon} className={styles.icon} alt="Home" onClick={()=> navigate("/home")}/>
                </div>
                <form className={styles.searchbarForm} onSubmit={(e)=>search(e)}>
                    <input type="text" placeholder="Videogame..." value={name} className={styles.searchbar} onChange={(e) => typing(e)}/>
                </form>
                <div className={styles.aboutWrapper}>
                    <a className={styles.about} onClick={(() => navigate('/about'))}>About</a>
                    <a className={styles.linkedin} onClick={()=> linkedin()}>Linkedin</a>
                </div>
            </div>
        </nav>
    )
}


export default Nav;