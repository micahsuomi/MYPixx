import React, { useState } from 'react';
import {useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import NavbarLogo from './NavbarLogo/index';
import NavbarToggler from './NavbarToggler/index';
import NavbarUser from './NavbarUser/index';
import NavbarUserRegister from './NavbarUser/NavbarUserRegister/index';
import NavbarUserLogin from './NavbarUser/NavbarUserLogin/index';
import NavbarUserLogout from './NavbarUser/NavbarUserLogout/index';
import './style.css'


const Navbar = () => {
    const state = useSelector(state => state.auth);

    let { isAuthenticated, user } = state;
   
     
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


    return (
        <div className="navbar">
         <NavbarLogo />
               <NavbarToggler toggle={toggle}
                              isClicked={isClicked}
                              lineClassOneActive={lineClassOneActive}
                              lineClassOne={lineClassOne}
                              lineClassTwoActive={lineClassTwoActive}
                              lineClassTwo={lineClassTwo}
                              lineClassThreeActive={lineClassThreeActive}
                              lineClassThree={lineClassThree}/>
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
                <NavLink to ="/community" 
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
    isAuthenticated && user ?

        <NavbarUser user={user}
                    toggle={toggle}/>
                : null
        }
            <li>
            {
            !isAuthenticated && !user ?
            
            <ul className="register-login">
                <li>
                    <NavbarUserRegister toggle={toggle}/>
                </li>
                <li>
                    <NavbarUserLogin toggle={toggle}/>
                </li>
            </ul>
            :
                <NavbarUserLogout toggle={toggle}/>
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
