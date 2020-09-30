import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPhotos } from '../redux/actions/photoActions';


export default function usePhotos() {
    const photos = useSelector(state => state.photos.photos);
    // const dispatch = useDispatch()


    const [data, setData] = useState([]);
    const [err, setErr] = useState(null)

   
   
    useEffect(() => {
        setData(photos);
    }, [photos, err])

    
    return [err, data]
}
