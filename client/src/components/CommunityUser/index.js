import React from 'react';
import './style.css';

const CommunityUser = ({ avatar, name, bio }) => {
    return (
        <div className="user-container">
        <div className="user-image__container">
            {
                avatar === undefined || avatar === ''
                ?
                <img src='https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' alt={name}/>
                : 
                <img src={avatar} alt={name}/>
            }
        </div>
        <h4 className="user-name">{name}</h4>
        <ul className="user-details">
            {
                bio === undefined || bio === ''
            ?
            null 
            :
            <li>"{bio}"</li>
            }
           
        </ul>
        </div>
    )
}

export default CommunityUser;