import React, { useEffect } from 'react'
import PropTypes from "prop-types";

import "./style.scss";

const SortPhotoButton = ({ selectCategory }) => {
   
    const handleChange = (e) => {
        const { value } = e.target;
        selectCategory(value);
    }
    return (
        <form className="category-form">
            <select name="type" onChange={handleChange} defaultValue="all">
            <option value="all">All Categories</option>
            <option value="portrait">Portrait</option>
            <option value="landscape">Landscape</option>
            <option value="photography">Photography</option>
            <option value="abstract">Abstract</option>
            <option value="street art">Street Art</option>
            <option value="digital">Digital</option>
          </select>
        </form>
    )
}

export default SortPhotoButton;

SortPhotoButton.propTypes = {
    openCategories: PropTypes.bool,
  };

