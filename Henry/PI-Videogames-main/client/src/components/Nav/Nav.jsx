import "./Nav.css";
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
        dispatch(allActions.unVideogame())
    }, [dispatch]);

    function typing(e){
        setName(e.target.value)
    }

    function search(e){
        e.preventDefault()
        dispatch(allActions.filterVideogame(name))
        navigate('/search')
        setName('')
    }
    return(
        <nav className="nav">
            <Link to="/home" className="nav-item">
                <button className="btn-primary">
                    Home
                </button>
            </Link>
            <form className="searchBar" style={{margin:20}} onSubmit={(e)=>search(e)}>
            <input type="text" placeholder="Videogame..." value={name} className="searchbar" onChange={(e) => typing(e)}/>
            <button className="search_button" type="submit" >Search🔎</button>
            </form>
            <Link to="/" className="nav-item">
                <button className="btn-primary">
                    Landing Page
                 </button>
            </Link>
        </nav>
    )
}


export default Nav;