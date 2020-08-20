import React, { Component } from 'react';
import axios from 'axios';
import '../assets/style/edituser.css';
import { NavLink } from 'react-router-dom';

class EditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: {
                name: '',
                email: '',
                avatar: '',
                bio: ''
            }
                
                
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const id = this.props.match.params.id
        const url = `/api/user/${id}`;
        let updatedUser = this.state.user;
        axios.put(url, updatedUser, this.props.tokenConfig()).then((response) => {
            updatedUser = response.data
            
        })
        .catch(err => console.log(err))
        this.props.editUser(updatedUser);
        console.log(updatedUser)
        this.props.history.push(`/user/${id}`)

        
        
        


    }

    componentDidMount() {
        axios.get(`/api/user`)
        .then(res => {
            console.log(res.data)
            const foundUser = res.data.find((user) => user._id === this.props.match.params.id)
            this.setState({
                 user: foundUser
            })
        })
    }


    handleChange = (e) => {
        let {name, value} = e.target;
        const user = {...this.state.user, [name]: value}
        this.setState({user});
    }
    render() {

        let {name, email, avatar, bio} = this.state.user
        let id = this.props.match.params.id;
      
        return (
                <div className="register-form__container">
                    
                    <form onSubmit={this.handleSubmit} className="register-form animate-modal">
                    <div className="user-cancel-wrapper">
                    <NavLink to ={`/user/${id}`}
                    className="delete-link">
                        <i className="fas fa-times fa-2x"></i>
                        </NavLink>
                        </div>
                        <h2>Edit Profile for {name}</h2>
                        
                        
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
                            <label htmlFor="description">Image</label>
                            <input type="text" 
                            name="avatar"
                            value={avatar} 
                            placeholder="insert image link here"
                            onChange={this.handleChange}/>
                            </div>

                            
                            <div className="input-topics">
                            <label htmlFor="description">Bio</label>
                            <input type="text" 
                            name="bio"
                            value={bio} 
                            placeholder="bio"
                            onChange={this.handleChange}/>
                            </div>

                <div className="btn-save__wrapper">
                <button className="btn-register">Update</button>
                </div>
                </form>
            </div>
        )
    }
}

export default EditUser;
