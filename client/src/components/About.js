import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/style/about.css';

const About = (props) => {

    const sortedByLikes = props.photos.sort((a, b) => {
        if(a.likes.length > b.likes.length) return -1;
        if(b.likes.length < a.likes.length) return 1
        return 0;
    })

    const sortedByComments = props.photos.sort((a, b) => {
        if(a.comments.length > b.comments.length) return -1;
        if(b.comments.length < a.comments.length) return 1
        return 0;
    })

    sortedByLikes.length = 8;
    sortedByComments.length = 8;
    return (
        <div className="about-container">
            <h1>About</h1>
            <div className="about-paragraph__container">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Porta lorem mollis aliquam ut porttitor leo a. In pellentesque massa placerat duis ultricies lacus sed turpis tincidunt. Pellentesque id nibh tortor id. At augue eget arcu dictum varius duis at. Non nisi est sit amet. Nisl nunc mi ipsum faucibus. Mauris sit amet massa vitae tortor condimentum lacinia quis vel. Eu lobortis elementum nibh tellus molestie nunc non blandit massa. Nisl tincidunt eget nullam non nisi. Id venenatis a condimentum vitae sapien pellentesque habitant. Sed viverra ipsum nunc aliquet bibendum enim. Odio facilisis mauris sit amet massa. Amet nisl purus in mollis. Praesent tristique magna sit amet purus gravida quis blandit turpis. Amet venenatis urna cursus eget nunc scelerisque viverra mauris in. Duis ut diam quam nulla porttitor. Donec enim diam vulputate ut pharetra sit amet.
            </p>
        </div>
        <div className="most-liked-photos__container">
        <h4>Most Liked</h4>
        <div className="most-liked-photos__wrapper">
            
            {
                sortedByLikes.map((photo) => (
                    <NavLink to={`/photos/${photo._id}`} className="most-liked-photos__link">
                    <div className="photo-sorted__card grow">
                        <div className="photo-sorted__image__container">
                            <img src={photo.image}/>
                        </div>
                            <h4>{photo.name}</h4>
                            <h5>{photo.author.name}</h5>
                            <p className="photo-sorted__likes"><i className="fas fa-heart full-heart"> <span className="photo-sorted__likes">
                                {photo.likes.length} 
                                {
                                    photo.likes.length > 1 ? " Likes" : " Like"
                                }
                                
                                </span></i></p>
                    </div>
                    </NavLink>
                ))
            }
        </div>
        </div>

        <div className="most-liked-photos__container">
        <h4>Most Commented</h4>
        <div className="most-liked-photos__wrapper">
            
            {
                sortedByComments.map((photo) => (
                    <NavLink to={`/photos/${photo._id}`} className="most-liked-photos__link">
                    <div className="photo-sorted__card grow">
                        <div className="photo-sorted__image__container">
                            <img src={photo.image}/>
                        </div>
                            <h4>{photo.name}</h4>
                            <h5>{photo.author.name}</h5>
                            <p className="photo-sorted__likes">
                            {
                                photo.comments.length < 1 ?
                            <i className="far fa-comments comments-icon"></i>
                            :
                            <div className="comments-num__container">
                            <i className="fas fa-comments comments-icon"></i>
                            <div className="comments-length">
                            {
                                photo.comments.length} 
                            </div>
                            {
                                photo.comments.length === 1 ? <span> Comment</span> : <span> Comments</span>
                            }
                            </div>
                }
                                
                               </p>
                    </div>
                    </NavLink>
                ))
            }
        </div>
        </div>

        <div className="users-container">
            <h4>Our Users</h4>
            <div className="users-wrapper">
            {props.users.map((user) => ( 
                
                <NavLink to={`/user/${user._id}`} className="user-link__container grow">
                <div className="user-container">
                <div className="user-image__container">
                    {
                        user.avatar === undefined || user.avatar === ''
                        ?
                        <img src='https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' alt={user.name}/>
                        : 
                        <img src={user.avatar}/>
                    }
                </div>
                <h4 className="user-name">{user.name}</h4>
                <ul className="user-details">
                    {user.bio === undefined || user.bio === ''
                    ?
                    null 
                    :
                    <li>"{user.bio}"</li>
                    }
                   
                </ul>
                </div>
                </NavLink>

                
            ))}
            </div>

        </div>
        </div>




    )
}

export default About;