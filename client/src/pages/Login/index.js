import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import { login } from "../../redux/actions/authActions";
import { clearErrors } from "../../redux/actions/errorActions";

import "./style.scss";

const Login = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const errorMsg = useSelector((state) => state.errors.msg.msg);
  const dispatch = useDispatch();

  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const { email, password } = state;

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user));

    setTimeout(() => {
      dispatch(clearErrors());
    }, 4000);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState({
      ...state,
      [name]: value,
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(clearErrors());
      props.history.push("/photos");
    }
  });

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h3>Sign in</h3>

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

        <div className="btn-save__wrapper">
          <button className="btn-login">Login</button>
        </div>
        <p>
          Don't have an account yet? <NavLink to="/register">Sign up</NavLink>{" "}
          here
        </p>
      </form>
    </div>
  );
};

export default Login;
