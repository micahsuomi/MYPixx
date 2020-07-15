import React from 'react';
import { NavLink } from 'react-router-dom';
import PhotoItem from './PhotoItem';
import '../assets/style/photolist.css';



const PhotoList = (props) => {
    const photoList = props.photos.map((photo) => (
        <PhotoItem key={photo._id}
                   id={photo._id}
                   name={photo.name}
                   image={photo.image}
                   description={photo.description} />
    ))
    return (
            <div className="photo-gallery__container">
                <h1>Photo Gallery</h1>
                <NavLink to='/addphoto' 
              className="add-photo-link">
                <i className="fas fa-plus-circle fa-2x"></i> 
                <span className="add">Add New</span>
                </NavLink>
                <div className="photo-gallery__wrapper">
                    {photoList}
                </div>
            </div>
    )
}

    
export default PhotoList;
