import React from 'react'

import './style.scss'

const FeedBack = ({ validationErr }) => (
<div className="feedback">
  <p className="feedback__message">{validationErr}</p>
  </div>
)

export default FeedBack
