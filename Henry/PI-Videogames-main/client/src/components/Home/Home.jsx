/*eslint-disable */
import styles from "./Home.module.css"
/*eslint-disable */
import React from "react";
import Nav from "../Nav/Nav"
import Aside from "../Aside/Aside";
import Paginated from "../Paginated/Paginated";

function Home({search}){
return (
    <div>   
     <Nav />
     <Aside />
     <Paginated search={search}/>
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