import React from 'react';

const NavbarUserPhoto = ({ user }) => {
    console.log(user)
    return (
        <div className="nav-user-image-container grow">
            {
               user.avatar === undefined || user.avatar === '' 
               ?
               <img src='https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' alt={user.name}/>
               :
               <img src={user.avatar} alt={user.name}/>
           }
           </div>
    )
}

export default NavbarUserPhoto;