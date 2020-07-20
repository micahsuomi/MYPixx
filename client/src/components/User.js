import React, { Component } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import PhotoItem from '../components/PhotoItem';
import '../assets/style/user.css';


class User extends Component {
    constructor(props) {
        super(props)
        this.state = {
            userGallery: [],
        }
    }

    
    componentDidMount() {
        console.log(this.props)
        const userId = this.props.match.params.id
        // let id = this.props.match.params.id
        axios.get(`/api/user/${userId}`)
        .then(res => {
            this.setState({
                userGallery: res.data
            })
        })
        
    }

    render() {
        
        
        let { userGallery } = this.state;
        const id = this.props.match.params.id;

        
       let userPhotos = userGallery.map((photo) => (
            <PhotoItem key={photo._id}
            id={photo._id}
            name={photo.name}
            image={photo.image}
            description={photo.description}
            author={photo.author.name}
            authorId={photo.author.id} />
))
        
        let galleryAuthor = userGallery.map((photo) => {
            return photo.author.name
        })
        let author = {
            name: '',
            avatar: '',
            bio: ''
        }
        userGallery.find((photo) => {
            // return photo.id === id;
            author.name = photo.author.name
            author.avatar = photo.author.avatar
        })

        console.log(author.name)
        console.log(this.props)
      
        return (
            <div>
            {
            this.props.user !== null && this.props.user._id === this.props.match.params.id ?
            <div className="user-details__wrapper">

            <h1>{this.props.user.name} Dashboard</h1>
            <p>{this.props.user.email}</p> 
            <div className="user-image-container">
            <img src={this.props.user.avatar} alt={this.props.user.name}/>
            </div>
            <p>{this.props.user.bio}</p>

            <NavLink to={`/edituser/${id}`} className="edit-user__link">
            <button className="profile-update__btn">Update Profile</button>
            </NavLink>
            
            </div>

            :

            <div className="user-details__wrapper">

            <h1>{author.name}</h1> 


            </div>


        }
            <div className="photo-gallery__container">
                <h1>User Gallery</h1>
                <h4>{userGallery.length} photos</h4> 
                <div className="photo-gallery__wrapper">
                {userPhotos} 
                </div>
            </div>

        </div>
        )
    }
}

export default User;

