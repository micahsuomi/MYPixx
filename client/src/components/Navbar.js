import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/style/navbar.css'


const Navbar = (props) => {
    let { isAuthenticated, user, isLoading } = props
    // console.log(isAuthenticated, user, isLoading)
    return (
        <div className="navbar">
        <div className="navbar-left">
            <ul className="navbar-links__left">
            <li>
            <NavLink exact to="/" 
                className="navbar-link logo">
                {/* <i className="fas fa-camera fa-2x"></i> */}
                MYPiC
                </NavLink>
            </li>
            <li>
                <NavLink exact to="/" 
                className="navbar-link" 
                activeStyle={{color: 'var(--secondary)'}}>
                Home
                </NavLink>
          </li>  
            <li>
            <NavLink to ="/about" 
            className="navbar-link"
            activeStyle={{color: 'var(--secondary)'}}>
            About
        </NavLink>
    </li>
    <li>
    <NavLink to="/photos" className="navbar-link" activeStyle={{color: 'var(--secondary)'}}>
        Photos
    </NavLink>
    </li>
   
            </ul>

        </div>
        <div className="navbar-right">
        <ul className="navbar-links__right">

           
{
    isAuthenticated && user && isLoading ?

    <li>
         
        <NavLink to={`/user/${user._id}`} 
        className="user-link"
        activeStyle={{color: 'var(--secondary)'}}>
         {` ${user.name}`}
         <div className="nav-user-image-container">

         {
                user.avatar === undefined || user.avatar === '' 
                ?
                <img src='https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1' alt={user.name}/>
                :
                <img src={user.avatar} alt={user.name}/>


            }
            </div>
        </NavLink> 
    </li>
    : 
    null
        }

            <li>
            {
            !isLoading
            ? 
            <div>
            <NavLink to="/register" 
            className="navbar-link"
            activeStyle={{color: 'var(--secondary)'}}>
                Register
            </NavLink>
            <NavLink to="/login" 
            className="navbar-link"
            activeStyle={{color: 'var(--secondary)'}}>
                Login
            </NavLink> 
            </div>

            :
            <NavLink to="#" className="navbar-link" onClick={props.logout}>
            Logout
            </NavLink>
            }
            </li>



            </ul>
        </div>
        
</div>
    )
}

export default Navbar;
