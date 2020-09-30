import axios from 'axios';
import { 
         GET_PHOTOS, 
         ADD_PHOTO, 
         DELETE_PHOTO, 
         GET_PHOTO,
         EDIT_PHOTO,
         LIKE_PHOTO, 
         AUTH_ERR
        } from './types';

import { tokenConfig } from './authActions';

export const getPhotos = () => dispatch => {
        const url = '/api/photos/';
        axios.get(url)
        .then((res) => dispatch({
            type: GET_PHOTOS,
            payload: res.data
        }))
        .catch((err) => {
            console.log(err.response)
        })
        
}

export const addPhoto = (newPhoto) => (dispatch, getState) => {
    const url="/api/photos";
    axios.post(url, newPhoto, tokenConfig(getState))
    .then((res) => dispatch({
        type: ADD_PHOTO,
        payload: res.data
    }))
    .catch(err => console.log(err))
}

export const getPhoto = (id) => (dispatch) => {
    const url = `/api/photos`
        axios.get(url)
        .then((res) => dispatch({
            type: GET_PHOTO,
            payload: res.data.find((photo) => photo._id === id)
        }))     
            .catch((err) => {
            console.log(err)
})
}

export const editPhoto = (id, photo) => (dispatch, getState) => {
    const url=`/api/photos/${id}`;
    axios.put(url, photo, tokenConfig(getState))
    .then((res) => dispatch({
        type: EDIT_PHOTO,
        payload: res.data
        
    }))
    .catch(err => console.log(err))


}

export const deletePhoto = (id) => (dispatch, getState) => {
    const url =`/api/photos/${id}`;
    axios.delete(url, tokenConfig(getState))
    .then((res) => dispatch({
        type: DELETE_PHOTO,
        payload: id
    }))
    .catch((err) => {
        console.log(err)
    })
}

export const likePhoto = (likedPhoto, id) => (dispatch, getState) => {
    const url = `/api/photos/${id}/like`
    console.log(id)
    axios.post(url, likedPhoto, tokenConfig(getState))
        .then(res => 
            dispatch({
            type: LIKE_PHOTO,
            payload: res.data   
            })
            )
            .catch(err => console.log(err))
}






