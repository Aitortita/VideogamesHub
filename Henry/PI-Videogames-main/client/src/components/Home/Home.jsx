import styles from "./Home.module.css"
import React, { useEffect } from "react";
import Nav from "../Nav/Nav"
import DiscoverPage from "../DiscoverPage";
import Aside from "../Aside/Aside";
import { useDispatch } from "react-redux";
import * as allActions from "../../redux/actions"
import Footer from "../Footer/Footer";

function Home({search}){
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(allActions.unFilterVideogames())
    },[dispatch])
return (
    <div>   
     <Nav />
     <div className={styles.DiscoverPageWrapper}>
     <Aside />
     <DiscoverPage search={search}/>
     <Footer />
     </div>
    </div>
    )
}


// [ ] Input de búsqueda para encontrar videojuegos por nombre
// [ ] Área donde se verá el listado de videojuegos. Deberá mostrar su:
// Imagen
// Nombre
// Géneros
// [ ] Botones/Opciones para filtrar por género y por videojuego existente o agregado por nosotros
// [ ] Botones/Opciones para ordenar tanto ascendentemente como descendentemente los videojuegos por orden alfabético y por rating
// [ ] Paginado para ir buscando y mostrando los siguientes videojuegos, 15 juegos por pagina, mostrando los primeros 15 en la primer pagina.



export default Home;