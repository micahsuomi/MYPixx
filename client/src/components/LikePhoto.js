import React, { Component } from 'react'
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import '../assets/style/likephoto.css';


const LikePhoto = (props) => {
    console.log(props)
  
        const handleSubmit = (e) => {
        e.preventDefault();
        const id = props.match.params.id
        if(!props.user) {
            props.history.push('/login')
        } else {
            const url = `/api/photos/${id}/like`
           
            if(props.user) {
                console.log('here')
                
                const newLike = props.user._id
                const likedPhoto = props.filteredPhoto
                console.log('token config for likes', props.tokenConfig())
                axios.post(url, likedPhoto, props.tokenConfig())
                .then(res => {
                console.log(res.data, 'liked')
              
            })
            .catch(err => console.log(err))
            console.log(likedPhoto)
            props.likePhoto(likedPhoto);


            }
            
        }
         

      } 
      
        let likedPhoto
        console.log(props.user)
        if(props.user) {
             likedPhoto = props.filteredPhoto.likes.some((like) => like._id === props.user._id)
             console.log(likedPhoto)

        }

        return (
            <div>
                  <form className="like-container" onSubmit={handleSubmit}>
                {
                    props.user && likedPhoto ?

                    <button className="like-btn"><i className="fas fa-heart full-heart fa-2x grow"></i></button>
                    :
                    <button className="like-btn"><i className="far fa-heart empty-heart fa-2x grow"></i></button>
                }
            {
                props.filteredPhoto.likes.length > 0 ?
                <NavLink to ={`/photos/${props.match.params.id}/likes`} className="likes-number grow">{props.filteredPhoto.likes.length} 
                {
                    props.filteredPhoto.likes.length === 1 ? <span> Like</span> : <span> Likes</span>
                }
                
                </NavLink>
                : null

            }
            </form>
            </div>
        )
    }


export default LikePhoto;
