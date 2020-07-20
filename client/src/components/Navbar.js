import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/style/navbar.css'


const Navbar = (props) => {
    let { isAuthenticated, user } = props
    return (
        <div className="navbar">
        <ul className="navbar-links">

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
   
        {
            isAuthenticated && user ?

            <li>
                Welcome 
                <NavLink to={`/user/${user._id}`} 
                className="user-link"
                activeStyle={{color: 'var(--secondary)'}}>
                 {` ${user.name}`}
                </NavLink> 
            </li>
            : 
            null
        }

        <li>
        {
        !isAuthenticated 
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
    )
}

export default Navbar;
