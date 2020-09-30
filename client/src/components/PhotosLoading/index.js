import React from 'react';

import './style.css';

const PhotosLoading = () => {
    return (
        <div className="loading-container">
            <h1>Loading Photos...</h1>
            <div className="lds-circle"><div></div></div>
        </div>
    )
}

export default PhotosLoading;