import React from 'react';
import {NavLink} from 'react-router-dom';
import '../components/CommentLike/style.css';

const CommentLike = (props) => {
    let { userId, name, avatar } = props;
    return (
        <div className="like-comment__user__container">
             <div className="like-image-container">  
              {
                    avatar === undefined || avatar === ''
                    ?
                    <img src='https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' alt={avatar}/>
                    :
                    <img src={avatar} alt={avatar}/>

                }              
              </div>
            <NavLink to ={`/user/${userId}`} className="like-comment__user__name">
                <p>{name}</p>
            </NavLink>
        </div>
    )
}
export default CommentLike;
