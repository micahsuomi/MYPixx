import React, { useState, useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux';
import { getPhotos } from '../../redux/actions/photoActions';
import { likePhoto } from '../../redux/actions/photoActions';
import usePhotos from '../../hooks/usePhotos';
import {NavLink} from 'react-router-dom';
import './style.css';


const LikePhoto = (props) => {
    // console.log(props.user)
    const [err, photos] = usePhotos([])
    const [isLiked, setIsLiked] = useState()


    const dispatch = useDispatch();
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const user = useSelector(state => state.auth.user)
    console.log(user)
        const handleSubmit = (e) => {

        e.preventDefault();
        const id = props.match.params.id
        if(isAuthenticated === null) {
            props.history.push('/login')
        } else {            
                        
                const likedPhoto = props.filteredPhoto
                dispatch(likePhoto(likedPhoto, id))
                props.history.push(`/photos/${id}`)
                dispatch(getPhotos())

        }
         

      } 

      
        let likedPhoto
        if(isAuthenticated) {
             likedPhoto = props.filteredPhoto.likes.some((like) => like._id === user.id)
             
        }

        

        let test = isAuthenticated && props.filteredPhoto.likes.some((like) => like._id === user.id)
        console.log(test)
        return (
            <div>
                  <form className="like-container" onSubmit={handleSubmit}>
                {
                    isAuthenticated && props.filteredPhoto.likes.some((like) => like._id === user.id) ?

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
