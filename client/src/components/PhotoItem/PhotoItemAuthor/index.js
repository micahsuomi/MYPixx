import React from 'react';

import { NavLink } from 'react-router-dom';

const PhotoItemAuthor = ({ authorId, author, authorImg }) => {
    return (
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
    )
}

export default PhotoItemAuthor;