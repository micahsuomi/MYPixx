import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { login } from "../../redux/actions/authActions";
import { clearErrors } from "../../redux/actions/errorActions";

import "./style.scss";

const Login = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const errorMsg = useSelector((state) => state.error.msg.msg);
  const dispatch = useDispatch();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const { email, password } = user;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(user));

    setTimeout(() => {
      dispatch(clearErrors());
    }, 4000);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(clearErrors());
      props.history.push("/");
    }
  });

  return (
    <div className="login">
      <form onSubmit={handleSubmit} className="login__form">
        <h2>Sign in to MyPixx</h2>

        <p className="warning-msg">{errorMsg}</p>
        <div className="input-topics">
          <label htmlFor="image">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="email"
            onChange={handleChange}
            required={true}
            autoComplete={email}
          />
        </div>

        <div className="input-topics">
          <label htmlFor="description">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={handleChange}
            required={true}
          />
        </div>

        <div className="login__btn-wrapper">
          <button className="login__btn-login">Sign In</button>
        </div>
        <NavLink to="/forgot-password">Forgot Password?</NavLink>
        <p>
          Don't have an account yet? <NavLink to="/register">Sign up</NavLink>{" "}
          here
        </p>
      </form>
    </div>
  );
};

export default Login;
