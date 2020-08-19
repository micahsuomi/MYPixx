import React, { Component } from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import '../assets/style/addphoto.css';

class EditPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: {
                name: '',
                image: '',
                description: ''
            }
           

        }

    }

    componentDidMount() {
        let id = this.props.match.params.id
        const url = `/api/photos`
        axios.get(url)
        .then((response) => {
            console.log(response.data)
            let foundPhoto = response.data.find((photo) => photo._id === id)
            console.log(foundPhoto)
            this.setState({photo: foundPhoto})
        
        })
        .catch((err) => console.log(err))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let id = this.props.match.params.id;
        const url=`/api/photos/${id}`;
        const updatedPhoto = this.state.photo;
        axios.put(url, updatedPhoto, this.props.tokenConfig()).then((response) => {
        })
        .catch(err => console.log(err))
        this.props.editPhoto(updatedPhoto);
        this.props.history.push('/photos')
        

    }
    handleChange = (e) => {
        let {name, value} = e.target;
        const photo = {...this.state.photo, [name]: value}
        this.setState({photo})

    }
    render() {
        console.log(this.state.photo)
        let { name, image, description } = this.state.photo;
        return (
            <div className="add-photo__container">

                <form onSubmit={this.handleSubmit} className="add-photo__form">
                <div className="cancel-wrapper">
                    <NavLink to ='/photos'
                    className="delete-link">
                        <i className="fas fa-times fa-2x"></i>
                        </NavLink>
                        </div>
                <h2>Edit Photo: </h2>

                <div className="input-topics">
                <label htmlFor="name">Name</label>
                <input type="text" 
                name="name"
                value={name} 
                placeholder="name"
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

export default EditPhoto
