import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/style/navbar.css'


const Navbar = (props) => {
    let { isAuthenticated, user, isLoading } = props;
    const  [ isClicked, setState ] = useState(false);

    let navList = ['nav-list']
    let navListOpen = ['nav-list open']

    let lineClassOne = ['line top']
    let lineClassOneActive = ['line top active']

    let lineClassTwo = ['line middle']
    let lineClassTwoActive = ['line middle active']

    let lineClassThree = ['line bottom']
    let lineClassThreeActive = ['line bottom active']
    const toggle = () => {
        setState(!isClicked);
    }


    // console.log(isAuthenticated, user, isLoading)
    return (
        <div className="navbar">
         <NavLink exact to="/" 
                className="logo"
                title=" home">
                MYPixx
                </NavLink>
                <div className="toggle-wrapper">
                  <div
                    className="toggle-bar"
                    onClick={toggle}
                    style={
                    isClicked ? borderToggleBarClicked : borderToggleBarUnclicked
                    }
                >
                    <span
                    className={isClicked ? lineClassOneActive : lineClassOne}
                    ></span>
                    <span
                    className={isClicked ? lineClassTwoActive : lineClassTwo}
                    ></span>
                    <span
                    className={isClicked ? lineClassThreeActive : lineClassThree}
                    ></span>
                </div>
                </div>
            <ul className={isClicked ? navListOpen : navList}>
           
            <li>
                <NavLink exact to="/" 
                className="navbar-link" 
                activeStyle={{color: 'var(--secondary)'}}
                onClick={toggle}>
                <i className="fas fa-home nav-list__icon grow" title="home"> 
                {/* <span> Home</span> */}
                </i>
                </NavLink>
          </li>  
            <li>
            <NavLink to ="/about" 
            className="navbar-link"
            activeStyle={{color: 'var(--secondary)'}}
            onClick={toggle}>
            <i className="fas fa-users nav-list__icon grow" title="community">
                {/* <span> Community</span> */}
            </i>
            
        </NavLink>
    </li>
    <li>
        <NavLink to="/photos" 
        className="navbar-link" 
        activeStyle={{color: 'var(--secondary)'}}
        onClick={toggle}>
            <i className="fas fa-images nav-list__icon grow" title="photo gallery">
                {/* <span> Gallery</span> */}
            </i>
        </NavLink>
    </li>
    {
    isAuthenticated && user && isLoading ?

    <li>
        <NavLink to={`/user/${user._id}`} 
        className="user-link"
        activeStyle={{color: 'var(--secondary)'}}
        onClick={toggle}>
         {` ${user.name}`}
         <div className="nav-user-image-container grow">

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
            <ul className="register-login">
                <li>
            <NavLink to="/register" 
            className="navbar-link user-link"
            activeStyle={{color: 'var(--secondary)'}}
            onClick={toggle}>
            <i class="fas fa-user-plus nav-list__icon grow" title="register">
                {/* <span> Register</span> */}
            </i>
                
            </NavLink>
            </li>
            <li>
            <NavLink to="/login" 
            className="navbar-link login-link"
            activeStyle={{color: 'var(--secondary)'}}
            onClick={toggle}>
                <i className="fas fa-sign-in-alt nav-list__icon grow" title="login">
                    {/* <span> Login</span> */}
                </i>
            </NavLink> 
            </li>
            </ul>

            :
            <NavLink to="/" 
            className="navbar-link" 
            onClick={props.logout}
            >
            <i className="fas fa-sign-out-alt nav-list__icon" title="logout">
            {/* <span> Logout</span>*/}
            </i>  
            </NavLink>
            }
            </li>




            </ul>

        </div>
        
    )
}

const borderToggleBarClicked = {
    border: '1px solid white',
    borderRadius: '500px',
  }
  
  const borderToggleBarUnclicked = {
    border: 'none',
  }

export default Navbar;
