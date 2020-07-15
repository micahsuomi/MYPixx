import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/style/home.css';

const Home = () => {
    return (
        <div className="home-container">
            <div className="home-wrapper">
                    <h1 className="title">Photo Gallery</h1>
                        <h3 className="subtitle">A Photo Gallery with MERN Stack</h3>
                            <NavLink to="/photos" className="nav-gallery__link">
                                    See Gallery
                            </NavLink>
            </div>
        </div>
    )
}

export default Home;
