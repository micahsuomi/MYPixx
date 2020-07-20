import React from 'react';
import { NavLink } from 'react-router-dom';
import PhotoItem from './PhotoItem';
import '../assets/style/photolist.css';



const PhotoList = (props) => {
    console.log(props)
    let { isAuthenticated, isPageLoading, isErrorShowing } = props;
    const photoList = props.photos.map((photo) => (
        <PhotoItem key={photo._id}
                   id={photo._id}
                   name={photo.name}
                   image={photo.image}
                   description={photo.description}
                   author={photo.author.name}
                   authorId={photo.author.id}
                   authorImg={photo.author.avatar} />
    ))
    
    return (
            <div className="photo-gallery__container">
                <h1>Photo Gallery</h1>
                {isAuthenticated ? 
                 <NavLink to='/addphoto' 
                 className="add-photo-link">
                   <i className="fas fa-plus-circle fa-2x"></i> 
                   <span className="add">Add New</span>
                   </NavLink> : 
                   <h3>Login to Upload Your Pictures</h3>
                   }
               
                {
                    isPageLoading ? <div className="lds-circle"><div></div></div>

                    :
                    
              
                    // photoList.length < 1 ?
                    // <div className="empty-gallery__title">
                    // <h1>There are no items in the gallery</h1>
                    // </div>

                    // :

                    <div className="photo-gallery__wrapper">
                    {photoList}
                </div>
                

            }
              
            </div>
    )
}

    
export default PhotoList;
