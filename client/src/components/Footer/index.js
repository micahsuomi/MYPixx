import React from "react";

import "./style.scss";

const Footer = () => {
  return (
    <div className="footer hide-mobile">
      <p className="footer__logo">MyPixx</p>
      <p className="footer__app-author">
        Developed By{" "}
        <a href="https://michelezuccawebdev.netlify.app/" target="blank">Michele Zucca</a>
      </p>
      <p className="footer__link">
        User profile photos from <a href="https://www.pexels.com/">Pexels</a>
      </p>
    </div>
  );
};

export default Footer;
