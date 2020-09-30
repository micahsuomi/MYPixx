import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { getUser } from '../../redux/actions/userActions';
import PhotoItem from '../../components/PhotoItem';
import './style.css';

const User = (props) => {
    let { isAuthenticated } = props.user;
    const [ isUserPage, setIsUserPage ] = useState(false);
    const dispatch = useDispatch();
    const userProfile = useSelector(state => state.users.user);
    const userPhotos = useSelector(state => state.users.user.photos);
    const isUserLoaded = useSelector(state => state.users.isUserLoaded);
    const errorMsg = useSelector(state => state.users.errorMsg);
    const isErrShowing = useSelector(state => state.users.isErrShowing);

    
    const fetchUserData = () => {
        const userId = props.match.params.id
        dispatch(getUser(userId))
    }
   
    useEffect(() => {
        fetchUserData()
    }, [])

    const closePopup = () => {
        props.closePopup();
    }

    const refreshPage = () => {
        fetchUserData();
    }
    
        const id = props.match.params.id;
        let formattedPhotos
        useEffect(() => {
            isUserLoaded ? formattedPhotos = userPhotos.map((photo) => (
                <PhotoItem key={photo._id}
                id={photo._id}
                name={photo.name}
                image={photo.image}
                description={photo.description}
                author={photo.author.name}
                authorId={photo.author.id}
                authorImg={photo.author.avatar}
                likes={photo.likes}
                comments={photo.comments}
                isUserPage={isUserPage}
                userProfile={userProfile} />
              )) : fetchUserData();
            }, [])
      
   
    if(isAuthenticated) {
        let { name, email, bio } = props.user.user;


    }
    return (
        <div>
            <h1>user page</h1>
            {
                isUserLoaded && !errorMsg ? 
                <div>
                    {
                isAuthenticated && props.user.user.id === props.match.params.id ?
                <div className="user-details__wrapper">
                <h1>{props.user.user.name} Dashboard</h1>
                <p>{props.user.user.email}</p> 
                <div className="user-image-container">
                    {
                        userProfile.avatar === undefined || userProfile.avatar === ''
                        ?             
                        <img src='https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' alt={props.user.user.name}/>
                        :                    
                        <img src={userProfile.avatar} alt={userProfile.name}/>
                    }
                </div>
                    <p>{userProfile.bio}</p>
                    <NavLink to={`/edituser/${id}`} className="edit-user__link">
                    <button className="profile-update__btn grow">Update Profile</button>
                    </NavLink>
                    </div>
                    :
                <div className="user-details__wrapper">
                    <h1>{userProfile.name}</h1> 
                    <div className="user-image-container">
                        {
                            userProfile.avatar === undefined || userProfile.avatar === '' ?
                            <img src='https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' alt={userProfile.name}/>
                            :
                            <img src={userProfile.avatar} alt={userProfile.name}/>
                        }
                    </div>
            <p>{userProfile.bio}</p>
              </div>
                    }
                {
                props.isPopupOpen ?
                <div className="photo-added__popup__container">
                <div className="photo-added__popup">
                <div className="photo-added__popup__header">
                <i className="fas fa-times-circle fa-2x grow" onClick={closePopup}></i>
                </div>
                <div className="photo-added__popup__body">
                   <h3>User Profile Updated!</h3>
                </div>
               </div>
               </div>
               :
               null
           }
            <div className="photo-gallery__container">
            <h1>User Gallery</h1>      
            {userPhotos.length < 1 ? 
               <h1>This user has not posted any pictures</h1>
                :  
                <h4>{userPhotos.length} photos</h4> 
                }    
            <div className="photo-gallery__wrapper">
            {formattedPhotos} 
            </div>       
        </div>
        </div>
            :
                <div>
                    {
                        !isUserLoaded && errorMsg ? 
                        <div className="error-container" style={{height: '100vh'}}>
                        <h3>Something went wrong. Refresh the page</h3>
                        <button onClick={refreshPage} className="btn-refresh grow"><i className="fas fa-redo-alt fa-2x"></i></button> 
                        </div>
                        :
                        <div className="loading-container" style={{height: '100vh'}}>
                        <h1>Loading User...</h1>
                        <div className="lds-circle"><div></div></div>
                        </div>
                    }
                </div>   
        } 
    </div>

    )
}

export default User;
