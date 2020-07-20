import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/style/photoitem.css';

const PhotoItem = (props) => {
    let {id, name, image, author, authorId, authorImg} = props;
    return (
        <div className="gallery-photo__container grow">
            <NavLink to={`/photos/${id}`} className="view-photo__link">
            <h3 className="gallery-photo__title">{name}</h3>
            <img src={image} alt={name} className="gallery-photo__image"/>
            </NavLink>
            <p className="author grow">Author:<NavLink to={`/user/${authorId}`} className="author-link"> {author}</NavLink></p>
            <div className="author-image-container">
            <img src={authorImg} alt={author}/>
            </div>
        </div>
        
    )

}

export default PhotoItem;
