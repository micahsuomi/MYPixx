import React, { useState, useEffect } from 'react';
import {useSelector} from 'react-redux';

export default function useUser() {
    const users = useSelector(state => state.users.users)
    const [data, setData] = useState([]);
    const [err, setErr] = useState(null)

    useEffect(() => {
        setData(users)
       
    }, [users])
    
    return [err, data]
}