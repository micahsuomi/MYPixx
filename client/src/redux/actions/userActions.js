import {
    GET_USERS,
    GET_USER,
    LOADEDIT_USER, 
    EDIT_USER,
    LOAD_ERR
} from './types';

import axios from 'axios';
import { tokenConfig } from './authActions';

export const getUsers = () => (dispatch) => {
    axios.get(`/api/user`)
    .then(res => dispatch({
         type: GET_USERS,
         payload: res.data
    })
    )
    .catch((err) => dispatch({
         type: LOAD_ERR,
         payload: err.response
    }))

}

export const getUser = (userId) => dispatch => {
        const url = `/api/user/${userId}`;
        axios.get(url)
        .then((res) => dispatch({
            type: GET_USER,
            payload: res.data
        }))
        .catch((err) => dispatch({
            type: LOAD_ERR,
            payload: err.response
        }))

}

export const loadEditUser = (id) => dispatch => {
        const url = `/api/user`
            axios.get(url)
            .then(res => dispatch({
                type: LOADEDIT_USER,
                payload: res.data.find((user) => user._id === id)
            }))

}

export const updateUser = (id, user) => (dispatch, getState) => {
        const url = `/api/user/${id}`;
        axios.put(url, user, tokenConfig(getState))
        .then((res) => 
        dispatch({
            type: EDIT_USER,
            payload: res.data
            
        })
        )
        .catch(err => dispatch({
            type: LOAD_ERR,
            payload: err.response
        }))

}