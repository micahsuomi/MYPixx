import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/style/login.css';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
                email: '',
                password: '',
                
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let { email, password } = this.state;
        const user = {
            email,
            password
        }
        this.props.authenticateUser(user);
    }

    handleChange = (e) => {
        let { name, value } = e.target;
        this.setState({[name]: value})
    }


    render() {
        let { email, password } = this.state;
        let { isAuthenticated, redirectPhotos } = this.props;
        if(redirectPhotos && isAuthenticated) {
            console.log('calling back from redirect photos')
             this.props.history.push('/photos')
         }
        return (
                <div className="login-form__container animate-modal">
                    
                    <form onSubmit={this.handleSubmit} className="login-form">
                        <h2>Login</h2>
                        
                        
                        <p className="warning-msg">{this.props.msg}</p>

                            <div className="input-topics">
                            <label htmlFor="image">Email</label>
                            <input type="email" 
                            name="email"
                            value={email} 
                            placeholder="email"
                            onChange={this.handleChange}/>
                            </div>

                            <div className="input-topics">
                            <label htmlFor="description">Password</label>
                            <input type="password" 
                            name="password"
                            value={password} 
                            placeholder="password"
                            onChange={this.handleChange}/>
                            </div>

                <div className="btn-save__wrapper">
                <button className="btn-login">Login</button>
                </div>
                <p>Don't have an account yet? <NavLink to="/register">Register</NavLink> here</p>
                </form>
            </div>
                
        )
    }
}

export default Login;
