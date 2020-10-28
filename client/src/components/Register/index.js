import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import PropTypes from "prop-types";
import { register } from "../../redux/actions/authActions";
import { NavLink } from "react-router-dom";
import "./style.css";

const Register = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const errorMsg = useSelector((state) => state.auth.errorMsg);

  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password } = state;

    const newUser = {
      name,
      email,
      password,
    };
    dispatch(register(newUser));
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
      props.history.push("/login");
    }
  });

  return (
    <div className="register-form__container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2>Register</h2>
        <p className="warning-msg">{errorMsg}</p>
        <div className="input-topics">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            name="name"
            value={state.name}
            placeholder="Full Name"
            onChange={handleChange}
          />
        </div>

        <div className="input-topics">
          <label htmlFor="image">Email</label>
          <input
            type="email"
            name="email"
            value={state.email}
            placeholder="email"
            onChange={handleChange}
          />
        </div>

        <div className="input-topics">
          <label htmlFor="description">Password</label>
          <input
            type="password"
            name="password"
            value={state.password}
            placeholder="password"
            onChange={handleChange}
          />
        </div>

        <p>
          Have an account already? <NavLink to="/login">Login</NavLink>
        </p>
        <div className="btn-save__wrapper">
          <button className="btn-register">Register</button>
        </div>
      </form>
    </div>
  );
};

export default Register;
