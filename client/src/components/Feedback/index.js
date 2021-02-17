import React from 'react'
import PropTypes from "prop-types";

import './style.scss'

const FeedBack = ({ validationErr }) => (
<div className="feedback">
  <p className="feedback__message">{validationErr}</p>
  </div>
)

export default FeedBack;

FeedBack.propTypes = {
  validationErr: PropTypes.string
};
