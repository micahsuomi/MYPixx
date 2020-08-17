import React from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import '../assets/style/deletephoto.css';


const DeletePhoto = (props) => {
    let id = props.match.params.id;

    const deletePhoto = () => {
        const url = `/api/photos/${id}`
        axios.delete(url, props.tokenConfig())
        .then((res) => {
            console.log(res.data)
        })
        .catch((err) => {
            console.log(err)
        })
        //calls function on app.js
        props.history.push('/photos');
        props.deletePhoto();

    }
    return (
        <div className="delete-photo__container">
        <div className="delete-photo__wrapper">
            <div className="delete-photo__cancel-wrapper">
                    <NavLink to ={`/photos/${id}`}
                    className="delete-link">
                        <i className="fas fa-times fa-2x"></i>
                        </NavLink>
                        </div>
            <h3 className="warning">Are you sure you want to delete this photo?</h3>
            <div className="delete-btn__wrapper">
            <button className="delete-btn" onClick={deletePhoto}>Delete</button>
            </div>

            </div>
        </div>
    )
}

export default DeletePhoto;
