import styles from "./Home.module.css"
import React from "react";
import Nav from "../Nav/Nav"
import Aside from "../Aside/Aside";
import Paginated from "../Paginated/Paginated";

export default function Home({search}){
return (
    <div>   
     <Nav />
     <div className={styles.pageWrapper}>
     <Aside search={search}/>
     <Paginated search={search}/>
     </div>
    </div>
    )
}