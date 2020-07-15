import React from 'react';
import '../assets/style/viewphoto.css';
import { NavLink } from 'react-router-dom';


const ViewPhoto = (props) => {
    console.log(props)
    console.log(props.match.params.id)
    let id = props.match.params.id;
    const filteredPhoto = props.photos.find((photo) => {
        return photo._id ===  id
    }) 
  
    return (
        <div className="viewphoto-wrapper">
        <div className="viewphoto-container">
            <div className="viewphoto-header">
                <div>
                <NavLink to="/photos" className="back-to-photos__view-link">Back to Photos</NavLink>
                </div>
                <div className="edit-delete__wrapper">
                <NavLink to={`/editphoto/${id}`} className="edit-photo__link">
                <i className="fas fa-edit fa-2x"></i>
                </NavLink>
                <NavLink to ={`/deletephoto/${id}`} className="delete-photo__link">
                <i className="fas fa-trash fa-2x"></i>
                </NavLink>
                </div>
            </div>
            <img src={filteredPhoto.image} alt={filteredPhoto.name} />
            <div className="viewphoto-body">
            <h2>Title: {filteredPhoto.name}</h2>
            <p>Description: {filteredPhoto.description}</p>  
            </div>
            </div>
        </div>
    )
}

export default ViewPhoto;
