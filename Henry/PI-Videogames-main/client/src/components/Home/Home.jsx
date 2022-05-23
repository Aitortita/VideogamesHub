import "./Home.css"
import React from "react";
import { useSelector} from "react-redux";
import VideogameCard from "../VideogameCard/VideogameCard.jsx";
import Nav from "../Nav/Nav"

function Home(props){
    const videogames = useSelector(state => state.videogames);
    const videogamesFilter = useSelector(state => state.videogamesFilter);

return (
    <div>   
     <Nav />
        <div className="videogames-container">
            {
                props.search? 
                videogamesFilter.length > 0 ? videogamesFilter.map(e => <VideogameCard
                    id={e.id}
                    key={e.id}
                    genre={e.genre}
                    name={e.name}
                    rating={e.rating}       
                    platform={e.platform}         
                />)
                :
                <h4>No Videogames found</h4>
                :
                videogames?.map(e => <VideogameCard
                    id={e.id}
                    key={e.id}
                    genre={e.genre}
                    name={e.name}
                    rating={e.rating}       
                    platform={e.platform}         
                />)
            }
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