import React from 'react';

import { NavLink } from 'react-router-dom';
import './style.css';

const AddPhotoButton = () => {
    return (
        <div className="add-photo-link__container">
                <NavLink to='/addphoto' 
                    className="add-photo-link">
                    <i className="fas fa-plus-circle fa-2x"></i> 
                <span className="add">Add New</span>
                </NavLink>
       </div> 
    )
}

export default AddPhotoButton;



