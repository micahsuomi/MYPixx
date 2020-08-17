import React from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import '../assets/style/photoitem.css';

const PhotoItem = (props) => {
    let {id, name, image, author, authorId, authorImg, isUserPage, likes} = props;
    // console.log(authorImg)
    const handleSubmit = (e) => {
        e.preventDefault()
        if(!props.user) {
            props.history.push('/login')
        } else {
            const url = `/api/photos/${id}/like`
            console.log('token config for likes', props.tokenConfig())
            axios.post(url, props.tokenConfig()).then(res => {
                console.log(res)
              
            })
            .catch(err => console.log(err))
            props.likePhoto()
        }
         
       
      
      
      }
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
          
            {/* <div className="like-container">
                <form onSubmit={handleSubmit}>
                {
                    props.user && likes.includes(props.user._id) ?

                    <button><i className="fas fa-heart full-heart grow"> Unlike</i></button>

                    :

                    <button><i className="far fa-heart empty-heart grow"> Like</i></button>


                }
            <p className="likes-num">{likes.length} Likes</p>
            </form>
            </div>*/}
            {/* <NavLink to={`/photos/${id}/likes`}>
            <p className="likes-num">{likes.length} Likes</p>
            </NavLink> */}

            <div> 
        </div>
        </div>
        
    )

}

export default PhotoItem;
