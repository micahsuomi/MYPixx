import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getUser, loadEditUser, updateUser } from '../../redux/actions/userActions';
import './style.css';

const EditUser = (props) => {
    const [ user, setUser ] = useState({
        user: {
            name: '',
            email: '',
            avatar: '',
            bio: ''
        }
    })
    const dispatch = useDispatch();
    const loadedEditUser = useSelector(state => state.users.user);
    const [photoLoaded, setPhotoLoaded] = useState(false);
    const [isImageEditing, setIsImageEditing] = useState(false)
    const [updatedImage, setUpdatedImage ] = useState(null)
    const [previewSource, setPreviewSource ] = useState(null)
    const [fileInput, setFileInput ] = useState(null)
    const [selectedFile, setSelectedFile ] = useState(null)
    const [isImageChanged, setIsImageChanged ] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        const id = props.match.params.id;
        if(isImageChanged) {
            user.avatar = previewSource
        }
        console.log(user)
        dispatch(updateUser(id, user))
        props.history.push(`/user/${id}`)
        dispatch(getUser())

    }

    const fileSelectedHandler = (e) => {
        console.log(e.target.files[0])
        const file = e.target.files[0];
        setUpdatedImage(file);
        setUpdatedImage(file);
        setFileInput(e.target.value);
        filePreview(file);
                    
        
    }

    const filePreview = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
        setPreviewSource(reader.result);
        setUser({avatar: reader.result});
        setIsImageChanged(true)
        }
    }

    const openImageEditing = () => {
        setIsImageEditing(true);
        setUser({avatar: updatedImage});
    }

    const cancelImage = () => {
        setIsImageEditing(false);
        setPreviewSource(null);
        setIsImageChanged(false);
        
    }


    useEffect(() => {
        dispatch(loadEditUser(props.match.params.id))
    }, [dispatch])

    useEffect(() => {
        setUser(loadedEditUser)
    }, [dispatch])




    const handleChange = (e) => {
        let {name, value} = e.target;
        setUser({...user, [name]: value});
    }


        let { name, email, avatar, bio } = user;
        let id = props.match.params.id;
        if(avatar === undefined || avatar === '') {
            avatar = 'https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'
        }

        return (
            <div className="edit-user-form__container">
                <form onSubmit={handleSubmit} className="edit-user__form animate-modal">
                <div className="user-cancel-wrapper">
                <NavLink to ={`/user/${id}`}
                className="delete-link">
                    <i className="fas fa-times fa-2x"></i>
                    </NavLink>
                    </div>
                    <h2>Edit User Profile</h2>  
                    <p className="warning-msg">{props.msg}</p>
                        <div className="input-topics">
                        <label htmlFor="name">Full Name</label>
                        <input type="text" 
                        name="name"
                        value={name} 
                        placeholder="Full Name"
                        onChange={handleChange}/>
                        </div>

                        <div className="input-topics">
                        <label htmlFor="image">Email</label>
                        <input type="email" 
                        name="email"
                        value={email} 
                        placeholder="email"
                        onChange={handleChange}/>
                        </div>
                        {
                        !isImageChanged ? 
                        <div className="input-topics">
                        <label htmlFor="image" className="image-label">Image</label>
                        <input type="text" 
                        name="avatar"
                        value={avatar} 
                        placeholder="insert image link here"
                        onChange={handleChange}
                        style={{display: 'none'}}
                        />
                         <div className="edit-image__preview__container">
                        <img
                            src={avatar}
                            alt="curent user profile"
                            style={{ height: '200px' }}
                        />
                        </div>
                        </div>
                        : null

                    }

                {
                !isImageEditing ?
                <button onClick={openImageEditing} className="change-photo grow">Change 
                </button>
                : null
                }
                {
                isImageEditing || isImageChanged ? 

                    <div>
                    <div className="input-topics">
                    <label htmlFor="image" className="image-label">Image</label>
                    <input type="file" id="image" 
                    accept="image/*" 
                    required
                    onChange={fileSelectedHandler}
                    />
                    </div>
                    {
                    previewSource && (
                    <div className="edit-image__preview__container">
                    <img
                        src={previewSource}
                        alt="chosen"
                        style={{ height: '200px' }}
                    />
                    <button className="edit-image__cancel grow" onClick={cancelImage}>Remove</button>
                    </div>

                )}  {
                        !isImageChanged ? 
                        <div className="buttons-wrapper">
                    <button className="edit-image__cancel grow" onClick={cancelImage}>Cancel</button>
                    </div> : null
                    }

                    </div> : null
                    } 
                        <div className="input-topics">
                        <label htmlFor="description">Bio</label>
                        <textarea
                        type="text"
                        name="bio"
                        value={bio} 
                        placeholder="bio"
                        onChange={handleChange} />
                        </div>
                     <div className="btn-save__wrapper">
                  <button className="btn-register">Update</button>
            </div>
            </form>
        </div>
    )
}

export default EditUser;

/*
class EditUser extends Component {
        state = {
            user: {
                name: '',
                email: '',
                avatar: '',
                bio: ''
            },
                isImageEditing: false,
                updatedImage: null,
                previewSource: null,
                fileInput: null,
                selectedFile: null,
                isImageChanged: false
         
        }
    

    handleSubmit = (e) => {
        e.preventDefault();
        const id = this.props.match.params.id;
        if(this.state.isImageChanged) {
            this.state.user.avatar = this.state.previewSource
           
        }
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

    fileSelectedHandler = (e) => {
        console.log(e.target.files[0])
        const file = e.target.files[0];
        this.setState({updatedImage: file,
                        fileInput: e.target.value
                            })
        this.filePreview(file)
        
    }

    filePreview = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            this.setState({
                previewSource: reader.result,
                avatar: reader.result,
                isImageChanged: true

            })
        }
    }

    openImageEditing = () => {
        this.setState({
            isImageEditing: true,
            avatar: this.state.updatedImage
        })
    }

    cancelImage = () => {
        this.setState({
            isImageEditing: false,
            previewSource: null,
            isImageChanged: false
        })
    }

    componentDidMount() {
        axios.get(`/api/user`)
        .then(res => {
            console.log(res.data)
            const foundUser = res.data.find((user) => user._id === this.props.match.params.id)
            console.log(foundUser)
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

        let {name, email, avatar, bio} = this.state.user;
        let { isImageEditing, isImageChanged } = this.state;
        let id = this.props.match.params.id;
        if(avatar === undefined || avatar === '') {
            avatar = 'https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1'
        }
      
        return (
                <div className="edit-user-form__container">
                    
                    <form onSubmit={this.handleSubmit} className="edit-user__form animate-modal">
                    <div className="user-cancel-wrapper">
                    <NavLink to ={`/user/${id}`}
                    className="delete-link">
                        <i className="fas fa-times fa-2x"></i>
                        </NavLink>
                        </div>
                        <h2>Edit User Profile</h2>  
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
                            {
                            !isImageChanged ? 
                            <div className="input-topics">
                            <label htmlFor="image" className="image-label">Image</label>
                            <input type="text" 
                            name="avatar"
                            value={avatar} 
                            placeholder="insert image link here"
                            onChange={this.handleChange}
                            style={{display: 'none'}}
                            />
                             <div className="edit-image__preview__container">
                            <img
                                src={avatar}
                                alt="curent user profile"
                                style={{ height: '200px' }}
                            />
                            </div>
                            </div>
                            : null

                        }

{
                    !isImageEditing ?
                    <button onClick={this.openImageEditing} className="change-photo grow">Change 
                    </button>
                    : null
                }
                

                {
                    isImageEditing || isImageChanged ? 

                        <div>
                        <div className="input-topics">
                        <label htmlFor="image" className="image-label">Image</label>
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
                            <label htmlFor="description">Bio</label>
                            <textarea
                            type="text"
                            name="bio"
                            value={bio} 
                            placeholder="bio"
                            onChange={this.handleChange} />
                            </div>


                <div className="btn-save__wrapper">
                <button className="btn-register">Update</button>
                </div>
                </form>
            </div>
        )
    }
}

export default EditUser;*/
