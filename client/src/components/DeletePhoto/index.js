import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { deletePhoto } from '../../redux/actions/photoActions';
import './style.css';


const DeletePhoto = (props) => {

    const dispatch = useDispatch()
    let id = props.match.params.id;

    const deleteOnClick = () => {
        //calls function on redux actions
        dispatch(deletePhoto(id))
        console.log(id)
        props.history.push('/photos');

    }
    return (
        <div className="delete-photo__container animate-modal">
        <div className="delete-photo__wrapper">
            <div className="delete-photo__cancel-wrapper">
                    <NavLink to ={`/photos/${id}`}
                    className="delete-link">
                        <i className="fas fa-times-circle fa-2x"></i>
                        </NavLink>
                        </div>
            <h3 className="warning">Are you sure you want to delete this photo?</h3>
            <div className="delete-btn__wrapper">
            <button className="delete-btn" onClick={deleteOnClick}>Delete</button>
            </div>

            </div>
        </div>
    )
}

export default DeletePhoto;
