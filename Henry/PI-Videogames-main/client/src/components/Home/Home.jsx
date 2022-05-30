import styles from "./Home.module.css"
import React, { useEffect } from "react";
import Nav from "../Nav/Nav"
import Aside from "../Aside/Aside";
import { useDispatch } from "react-redux";
import * as allActions from "../../redux/actions"
import Paginated from "../Paginated/Paginated";

function Home({search}){
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(allActions.unFilterVideogames())
    },[dispatch])
return (
    <div>   
     <Nav />
     <div className={styles.pageWrapper}>
     <Aside />
     <Paginated search={search}/>
     </div>
    </div>
    )
}


export default Home;