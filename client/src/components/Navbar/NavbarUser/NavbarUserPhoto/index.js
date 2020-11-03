import React from "react";

import "./style.scss";

const NavbarUserPhoto = ({ user }) => {
  return (
    <div className="nav-user-image grow">
      {user.avatar === undefined || user.avatar === "" ? (
        <img
          src="https://i2.wp.com/www.winhelponline.com/blog/wp-content/uploads/2017/12/user.png?fit=256%2C256&quality=100&ssl=1"
          alt={user.name}
        />
      ) : (
        <img src={user.avatar} alt={user.name} />
      )}
    </div>
  );
};

export default NavbarUserPhoto;
