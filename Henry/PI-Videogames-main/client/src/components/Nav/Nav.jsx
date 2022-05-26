import styles from "./Nav.module.css";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as allActions from "../../redux/actions";
import { useDispatch} from "react-redux";

function Nav(props){
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [name, setName] = useState('');

    useEffect(() => {
        dispatch(allActions.getAllVideogames());
    }, [dispatch]);

    function typing(e){
        setName(e.target.value)
    }
    function clear(){
        dispatch(allActions.clear())
    }

    function search(e){
        e.preventDefault()
        clear()
        dispatch(allActions.filterVideogame(name))
        navigate('/search')
        setName('')
    }
    return(
        <nav className={styles.nav}>
            <Link to="/home" className={styles.navItem}>
                <button className="btn-primary" onClick={() => clear()}>
                    Home
                </button>
            </Link>
            <form className={styles.searchbar} style={{margin:20}} onSubmit={(e)=>search(e)}>
            <input type="text" placeholder="Videogame..." value={name} className={styles.searchbar} onChange={(e) => typing(e)}/>
            <button className={styles.search_button} type="submit" >Search🔎</button>
            </form>
            <Link to="/create/videogame" className={styles.navItem}>
                <button className={styles.search_button} style={{marginTop: 10}}>
                    Create your own videogame
                 </button>
            </Link>
            <Link to="/" className={styles.navItem}>
                <button className="btn-primary" >
                    Landing Page
                 </button>
            </Link>
        </nav>
    )
}


export default Nav;