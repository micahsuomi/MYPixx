import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/style/photoitem.css';

const PhotoItem = (props) => {
    let {id, name, image, author, authorId, authorImg, isUserPage, likes, comments} = props;
   
    return (
        <div className="gallery-photo__container grow">
            <NavLink to={`/photos/${id}`} className="view-photo__link">
            <h3 className="gallery-photo__title">{name}</h3>
            <img src={image} alt={name} className="gallery-photo__image"/>
            </NavLink>
            { isUserPage ? '' : 
            <div className="author-container">
              <p className="author grow">Author:<NavLink to={`/user/${authorId}`} className="author-link"> {author}</NavLink></p>
              <div className="author-image-container">  
              {
                    authorImg === undefined || authorImg === ''
                    ?
                    <img src='https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' alt={author}/>
                    :
                    <img src={authorImg} alt={author}/>

                }              
              </div>
              
              </div>
            }
          
          {
              likes !== undefined && comments !== undefined ? 
              <div className="likes-comments__wrapper">
                  {
                      likes.length < 1 ?
                      <i className="far fa-heart empty-heart grow" style={{margin: ".5rem"}}></i>
                      :
                      <NavLink to={`/photos/${id}/likes`} className="likes-link__num">
                      <i className="fas fa-heart full-heart grow"><span className="likes-num">{likes.length}</span></i>
                    </NavLink>
                      
                  }
                  {
                      comments.length < 1 ?
                      <i className="far fa-comments comments-icon"></i>
                    :
                    <NavLink to={`/photos/${id}/comments`} className="comments-link__num">
                    <i className="fas fa-comments comments-icon"><span className="comments-num">{comments.length}</span></i>
                    </NavLink>
                  }
         
            
            </div> 
            : null
          } 
          

            <div> 
        </div>
        </div>
        
    )

}

export default PhotoItem;
