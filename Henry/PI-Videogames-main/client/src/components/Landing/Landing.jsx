import "./Landing.css";
import React from "react";
import { Link } from "react-router-dom";

function Landing(props){
    
    // useEffect(() => {
    //     document.body.style.backgroundImage="url('../../images/Hyperbestia.jpg')";
    // })

return (
    <div className="body">
        <div className="fotos">

        </div>
        <div>
        <h1> VideogamesHub</h1>
        <Link to="/home">
            <button className="btn-primary">Home Page</button>
        </Link>
        </div>
    </div>
    )
}




export default Landing;