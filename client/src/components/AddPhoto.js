import React, { Component } from 'react';
import {NavLink} from 'react-router-dom';
import axios from 'axios';
import '../assets/style/addphoto.css';

class AddPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: '',
            description: '',
            author: ''

        }

    }

    
    handleSubmit = (e) => {
        e.preventDefault();
        let { name, image, description, author } = this.state
        const newPhoto = {name, image, description, author};
        console.log(newPhoto)
        const url="/api/photos"
        axios.post(url, newPhoto, this.props.tokenConfig()).then((response) => {
            console.log('saved')
        })
        .catch(err => console.log(err))
        this.props.addPhoto(newPhoto);
        this.props.history.push('/photos')
        

    }
   
    handleChange = (e) => {
        let {name, value} = e.target;
        this.setState({[name]: value})

    }
    render() {
        let { name, image, description } = this.state;
        return (
            <div className="add-photo__container">

                <form onSubmit={this.handleSubmit} className="add-photo__form animate-modal">
                <div className="cancel-wrapper">
                    <NavLink to ='/photos'
                    className="delete-link">
                <i className="fas fa-times-circle fa-2x grow"></i>
                        </NavLink>
                        </div>
                <h2>Add a new photo</h2>

                <div className="input-topics">
                <label htmlFor="name">Name</label>
                <input type="text" 
                name="name"
                value={name} 
                placeholder="photo name"
                onChange={this.handleChange}/>
                </div>

                <div className="input-topics">
                <label htmlFor="image">Image Link</label>
                <input type="text" 
                name="image"
                value={image} 
                placeholder="image link"
                onChange={this.handleChange}/>
                </div>

                <div className="input-topics">
                <label htmlFor="description">Description</label>
                <input type="text" 
                name="description"
                value={description} 
                placeholder="description"
                onChange={this.handleChange}/>
                </div>

                <div className="btn-save__wrapper">
                <button className="btn-save">Submit</button>
                </div>
                </form>
            </div>
        )
    }
}

export default AddPhoto
