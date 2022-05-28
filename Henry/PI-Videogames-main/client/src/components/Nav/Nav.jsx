import styles from "./Nav.module.css";
import React, { useEffect, useState } from "react";
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

    const search = async (e) => {
        e.preventDefault()
        await dispatch(allActions.clear())
        dispatch(allActions.searchVideogame(name))
        navigate('/search')
        setName('')
    }
    return(
        <nav className={styles.navWrapper}>
            <div className={styles.nav}>
            <img src={icon} className={styles.icon} alt="Home" onClick={()=> navigate("/home")}/>
            <form className={styles.searchbarForm} onSubmit={(e)=>search(e)}>
            <input type="text" placeholder="Videogame..." value={name} className={styles.searchbar} onChange={(e) => typing(e)}/>
            {/* <button className={styles.search_button} type="submit" >Search🔎</button> */}
            </form>
            <div>
                
            </div>
            </div>
        </nav>
    )
}


export default Nav;