import React, { Component } from 'react';
import axios from 'axios';
import {NavLink} from 'react-router-dom';
import '../assets/style/addphoto.css';
import '../assets/style/editphoto.css';


class EditPhoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            photo: {
                name: '',
                image: '',
                description: ''  
            },
                isPhotoLoaded: false,
                isImageEditing: false,
                updatedImage: null,
                previewSource: null,
                fileInput: null,
                selectedFile: null,
                isImageChanged: false
           

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
            this.setState({photo: foundPhoto, isPhotoLoaded: true})
        
        })
        .catch((err) => console.log(err))
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let id = this.props.match.params.id;
        const url=`/api/photos/${id}`;
        const updatedPhoto = this.state.photo;
        if(this.state.isImageChanged) {
            this.state.photo.image = this.state.previewSource
        }
        axios.put(url, updatedPhoto, this.props.tokenConfig()).then((response) => {
        })
        .catch(err => console.log(err))
        this.props.editPhoto(updatedPhoto);
        this.props.history.push('/photos')
        

    }
    fileSelectedHandler = (e) => {
        console.log(e.target.files[0])
        const file = e.target.files[0];
        this.setState({updatedImage: file,
                        fileInput: e.target.value
                            })
        this.filePreview(file)
        
    }

    handleChange = (e) => {
        let {name, value} = e.target;
        const photo = {...this.state.photo, [name]: value}
        this.setState({photo})

    }

    filePreview = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        const {image} = this.state.photo
        reader.onloadend = () => {
            this.setState({
                previewSource: reader.result,
                image: reader.result,
                isImageChanged: true

            })
        }
    }

    openImageEditing = () => {
        let {image} = this.state.photo
        this.setState({
            isImageEditing: true,
            image: this.state.updatedImage
        })
    }

    cancelImage = () => {
        this.setState({
            isImageEditing: false,
            previewSource: null,
            isImageChanged: false
        })
    }

    render() {
        console.log(this.state.photo)
        let { name, image, description } = this.state.photo;
        let { isPhotoLoaded, isImageEditing, isImageChanged } = this.state;
        return (
            <div className="edit-photo__container">

                <form onSubmit={this.handleSubmit} className="add-photo__form edit-photo__form animate-modal">
                <div className="cancel-wrapper">
                    <NavLink to ='/photos'
                    className="delete-link">
                        <i className="fas fa-times-circle fa-2x"></i>
                        </NavLink>
                        </div>
                <h2>Edit Photo</h2>
                
                {
                    isPhotoLoaded ? 
                <div>
                    <div className="input-topics">
                <label htmlFor="name">Name</label>
                <input type="text" 
                name="name"
                value={name} 
                placeholder="name"
                onChange={this.handleChange}/>
                </div>
                {
                    !isImageChanged ? 
                    <div>
                    <div className="input-topics">
                    <label htmlFor="image">Image</label>
                    <input type="text" 
                    name="image"
                    value={image} 
                    placeholder="image link"
                    onChange={this.handleChange}
                    style={{display: 'none'}}/>
                    </div>
                    <div className="edit-image__preview__container">
                    <img
                        src={image}
                        alt="curent image"
                        style={{ height: '200px' }}
                    />
                    </div>
                    </div> 
                    : null

                }

                {
                    !isImageEditing ?
                    <div className="change-photo__container">
                    <button onClick={this.openImageEditing} className="change-photo grow">Change 
                    </button>
                    </div>
                    : null
                }
                

                {
                    isImageEditing || isImageChanged ? 

                <div>
                <div className="input-topics">
                <label htmlFor="image">Image</label>
                <input type="file" id="image" 
                accept="image/*" 
                required
                onChange={this.fileSelectedHandler}
                />
                </div>
                {
                this.state.previewSource && (
                <div className="edit-image__preview__container">
                <img
                    src={this.state.previewSource}
                    alt="chosen"
                    style={{ height: '200px' }}
                />
                <button className="edit-image__cancel grow" onClick={this.cancelImage}>Remove</button>
                </div>

            )}  {
                    !isImageChanged ? 
                    <div className="buttons-wrapper">
                <button className="edit-image__cancel grow" onClick={this.cancelImage}>Cancel</button>
                </div> : null
                }
                
 
                </div> : null
                }
                

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
                </div>
                    :
                    <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
                }
                
                </form>
            </div>
        )
    }
}

export default EditPhoto
