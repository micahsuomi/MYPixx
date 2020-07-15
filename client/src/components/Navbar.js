import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/style/navbar.css'


const Navbar = () => {
    return (
        <div className="navbar">
        <ul className="navbar-links">

           <li>
    <NavLink to ="/" className="navbar-link">
        Home
    </NavLink>
    </li>  
    <li>
    <NavLink to ="/about" className="navbar-link">
        About
    </NavLink>
    </li>
    <li>
    <NavLink to="/photos" className="navbar-link">
        Photos
    </NavLink>
    </li>
 
    </ul>
</div>
    )
}

export default Navbar;
