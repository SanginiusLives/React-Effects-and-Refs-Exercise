import React from "react";
import './Card.css'

function Card ({id, name, image}) {
    return (
        <div className="card">
            <img src={image}/>
        </div>
    )
}

export default Card