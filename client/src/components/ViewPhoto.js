import React from 'react';
import '../assets/style/viewphoto.css';
import { NavLink } from 'react-router-dom';


const ViewPhoto = (props) => {
    console.log(props)
    let id = props.match.params.id;
    const slider = {
        index: '',
        prev: '',
        next: ''
    } 
    const filteredPhoto = props.photos.find((photo, index) => {
        slider.index = index
        slider.prev = index === 0 ? '' : props.photos[index - 1]._id
        slider.next = index === props.photos.length -1 ? '' : props.photos[index +1]._id

            return photo._id === id;

        
        
    }) 


    return (
        <div className="viewphoto-wrapper">
        <div>
        {
                    slider.prev != '' ?

                    <NavLink to ={slider.prev}><i className="fas fa-chevron-left fa-2x slider-arrow__left grow"></i></NavLink>

                    : ''

                }
        </div>
        <div className="viewphoto-container">
            <div className="viewphoto-header">
                <div>
                <NavLink to="/photos" className="back-to-photos__view-link">
                <i className="fas fa-arrow-alt-circle-left back-to-photos__arrow"></i>
                    <span className="back-to-photos__text">Back to Photos</span>
                    </NavLink>
                </div>
                {
                    props.isAuthenticated && filteredPhoto.author.id === props.user._id ?
                    <div className="edit-delete__wrapper">

                    <NavLink to={`/editphoto/${id}`} className="edit-photo__link">
                    <i className="fas fa-edit fa-2x"></i>
                    </NavLink>
                    <NavLink to ={`/deletephoto/${id}`} className="delete-photo__link">
                    <i className="fas fa-trash fa-2x"></i>
                    </NavLink>
                    </div>

                    :
                    ''

                }
              
            </div>
            <img src={filteredPhoto.image} alt={filteredPhoto.name} />
            <div className="viewphoto-body">
            <h2>{filteredPhoto.name}</h2>
            <h3>{filteredPhoto.author.name}</h3>
            <p>{filteredPhoto.description}</p>  
            </div>
            <div>

              
            </div>
            </div>
            <div>
            {
                    slider.next != '' ?

                    <NavLink to ={slider.next}><i className="fas fa-chevron-right fa-2x slider-arrow__right grow"></i></NavLink> 

                    : ''

                }
        </div>
        </div>
    )
}

export default ViewPhoto;
