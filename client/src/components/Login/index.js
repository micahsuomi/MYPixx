import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


import { login } from '../../redux/actions/authActions';
import { NavLink } from 'react-router-dom';
import './style.css';



const Login = (props) => {
    let {redirectPhotos } = props;
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated)
    const errorMsg = useSelector(state => state.auth.errorMsg)
    const dispatch = useDispatch()

    const [state, setState] = useState({
        email: '',
        password: ''
        
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        let {email, password} = state;
        const user = {
            email,
            password
        }
        dispatch(login(user));
        //props.authenticateUser(user)
    }

    const handleChange = (e) => {
        let {name, value} = e.target;
        setState({
            ...state,
            [name]: value
        })
    }

    
    useEffect(() => {
        if(isAuthenticated) {
             props.history.push('/photos')
         }
    })

    return (
        <div className="login-form__container">
                    
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
            
            <p className="warning-msg">{errorMsg}</p>
                <div className="input-topics">
                <label htmlFor="image">Email</label>
                <input type="email" 
                name="email"
                value={state.email} 
                placeholder="email"
                onChange={handleChange}/>
                </div>

                <div className="input-topics">
                <label htmlFor="description">Password</label>
                <input type="password" 
                name="password"
                value={state.password} 
                placeholder="password"
                onChange={handleChange}/>
                </div>

            <div className="btn-save__wrapper">
            <button className="btn-login">Login</button>
            </div>
            <p>Don't have an account yet? <NavLink to="/register">Register</NavLink> here</p>
            </form>
        </div>
    )
}

export default Login;

