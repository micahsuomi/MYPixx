import React, { Component } from 'react';
import '../assets/style/register.css';
import { NavLink } from 'react-router-dom';

class Register extends Component {
    constructor(props) {
        super(props)
        this.state = {
                name: '',
                email: '',
                password: '',
                
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const {name, email, password} = this.state;

        const newUser = {
            name,
            email, 
            password
        }
        this.props.registerUser(newUser);
        
        


    }


    handleChange = (e) => {
        let {name, value} = e.target;
        this.setState({[name]: value});
    }
    render() {
        let { name, email, password } = this.state;
        if(this.props.redirectLogin) {
            console.log('calling back from register')
             this.props.history.push('/login')
         }
        return (
                <div className="register-form__container">
                    
                    <form onSubmit={this.handleSubmit} className="register-form">
                        <h2>Register</h2>
                        
                        
                        <p className="warning-msg">{this.props.msg}</p>
                    
                            <div className="input-topics">
                            <label htmlFor="name">Full Name</label>
                            <input type="text" 
                            name="name"
                            value={name} 
                            placeholder="Full Name"
                            onChange={this.handleChange}/>
                            </div>

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

                <p>Have an account already? <NavLink to="/login">Login</NavLink></p>
                <div className="btn-save__wrapper">
                <button className="btn-register">Register</button>
                </div>
                </form>
            </div>
        )
    }
}

export default Register;
