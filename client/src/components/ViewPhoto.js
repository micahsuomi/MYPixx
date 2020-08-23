import React from 'react';
import '../assets/style/viewphoto.css';
import { NavLink } from 'react-router-dom';
import LikePhoto from './LikePhoto';


const ViewPhoto = (props) => {
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
        <div className="viewphoto-big__container">
            <div className="viewphoto-exit__header">
            <NavLink to="/photos" className="back-to-photos__view-link grow">
                <i className="fas fa-times fa-2x"></i>
                    </NavLink>
            </div>
        <div className="viewphoto-wrapper">
               
        <div>
        {
                    slider.prev !== '' ?

                    <NavLink to ={slider.prev}><i className="fas fa-chevron-left fa-2x slider-arrow__left grow"></i></NavLink>

                    : ''

                }
        </div>
        <div className="viewphoto-container">
            <div className="viewphoto-header">
             
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
            <NavLink to ={`/user/${filteredPhoto.author.id}`} className="view-photo__author__link">
            <h3>{filteredPhoto.author.name}</h3>
            </NavLink>
            <div className="author-image-container">

            {
                filteredPhoto.author.avatar === undefined || filteredPhoto.author.avatar === '' 
                ?
                <img src='https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' alt={filteredPhoto.author.name}/>
                :
                <img src={filteredPhoto.author.avatar} alt={filteredPhoto.author.name}/>


            }

            </div>
            <p>{filteredPhoto.description}</p>  
            </div>
            <div className="likephoto-comments__container">
                <div>
                <LikePhoto filteredPhoto={filteredPhoto}
                        tokenConfig={()=>props.tokenConfig()}
                        user={props.user}
                        token={props.token}   
                       {...props}/>

                </div>
          
          <div className="comments-link__container">
            <NavLink to={`/photos/${props.match.params.id}/comments`} className="comments-link">
                {
                    filteredPhoto.comments.length < 1 ?
                    <i className="far fa-comments fa-2x comments-icon"></i>
                    :
                    <div className="comments-num__container">
                    <i className="fas fa-comments fa-2x comments-icon"></i>
                    <div className="comments-length">
                    {filteredPhoto.comments.length} 
                    </div>
                    {
                        filteredPhoto.comments.length === 1 ? <span> Comment</span> : <span> Comments</span>
                    }
                    </div>
                }
           
            </NavLink>
            </div>
            </div>
            </div>
            <div>
            {
                    slider.next !== '' ?

                    <NavLink to ={slider.next}><i className="fas fa-chevron-right fa-2x slider-arrow__right grow"></i></NavLink> 

                    : ''

                }
        </div>
        </div>
        </div>

    )
}

export default ViewPhoto;
