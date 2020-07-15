import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/style/photoitem.css';

const PhotoItem = (props) => {
    let {id, name, image, description} = props;
    return (
        <NavLink to={`/photos/${id}`} className="view-photo__link">
        <div className="gallery-photo__container grow">
            <h3 className="gallery-photo__title">{name}</h3>
            <img src={image} alt={name} className="gallery-photo__image"/>
            <p className="gallery-photo__description">{description}</p>
        </div>
        </NavLink>
    )

}

export default PhotoItem;
