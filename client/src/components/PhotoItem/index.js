import React from 'react';

import { NavLink } from 'react-router-dom';
import PhotoItemAuthor from './PhotoItemAuthor';
import PhotoItemLikes from './PhotoItemLikes';
import PhotoItemComments from './PhotoItemComments';
import './style.css';

const PhotoItem = (props) => {
    let {id, name, image, author, authorId, authorImg, isUserPage, likes, comments, userProfile} = props;

    return (
        <div className="gallery-photo__container grow">
              <NavLink to={`/photos/${id}`} className="view-photo__link">
              <h3 className="gallery-photo__title">{name}</h3>
              <img src={image} alt={name} className="gallery-photo__image"/>
              </NavLink>

         
            { isUserPage ? '' : 
            <PhotoItemAuthor authorId={authorId} 
                             author={author}
                             authorImg={authorImg} />
          
            }
          
          {
              likes !== undefined && comments !== undefined ? 
              <div className="likes-comments__wrapper">
                 <PhotoItemLikes id={id} likes={likes}/>
                  <PhotoItemComments id={id} comments={comments} />
         
            
            </div> 
            : null
          } 
          

            <div> 
        </div>
        </div>
        
    )

}

export default PhotoItem;
