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
        console.log(setState)
    }


    // console.log(isAuthenticated, user, isLoading)
    return (
        <div className="navbar">
         <NavLink exact to="/" 
                className="logo">
                {/* <i className="fas fa-camera fa-2x"></i> */}
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
           
            <li className="navbar-link">
                <NavLink exact to="/" 
                className="navbar-link" 
                activeStyle={{color: 'var(--secondary)'}}
                onClick={toggle}>
                Home
                </NavLink>
          </li>  
            <li>
            <NavLink to ="/about" 
            className="navbar-link"
            activeStyle={{color: 'var(--secondary)'}}
            onClick={toggle}>
            About
        </NavLink>
    </li>
    <li>
        <NavLink to="/photos" 
        className="navbar-link" 
        activeStyle={{color: 'var(--secondary)'}}
        onClick={toggle}>
            Photos
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
            <ul className="register-login">
                <li>
            <NavLink to="/register" 
            className="navbar-link"
            activeStyle={{color: 'var(--secondary)'}}
            onClick={toggle}>
                Register
            </NavLink>
            </li>
            <li>
            <NavLink to="/login" 
            className="navbar-link"
            activeStyle={{color: 'var(--secondary)'}}
            onClick={toggle}>
                Login
            </NavLink> 
            </li>
            </ul>

            :
            <NavLink to="#" 
            className="navbar-link" 
            onClick={props.logout}
            onClick={toggle}>
            Logout
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
