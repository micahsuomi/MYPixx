import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import PropTypes from "prop-types";
import { register } from "../../redux/actions/authActions";
import {
  clearErrors,
  clearAllValidations,
} from "../../redux/actions/errorActions";
import { NavLink } from "react-router-dom";

import "./style.scss";

const Register = (props) => {
  const isValidated = useSelector((state) => state.auth.isValidated);
  const errorMsg = useSelector((state) => state.errors.msg.msg);
  const [isRegistered, setIsRegistered] = useState(false);
  // console.log(errorMsg)
  const dispatch = useDispatch();

  const [state, setState] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const { name, email, password, repeatPassword } = state;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      name,
      email,
      password,
      repeatPassword,
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
    if (isValidated) {
      dispatch(clearErrors());
      setIsRegistered(true);
    }
  }, [dispatch]);

  const redirectLogin = () => {
    props.history.push("/login");
    setIsRegistered(false);
    dispatch(clearAllValidations());
  };

  return (
    <>
      {isRegistered ? (
        <div className="confirmation-container">
          <div className="registration-confirmation-modal animate-modal">
            <h2>Successfully Registered!</h2>
            <div className="registration-confirmation-modal__btn-wrapper">
              <button
                className="registration-confirmation-modal__btn"
                onClick={redirectLogin}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="registration-container">
          <form onSubmit={handleSubmit} className="register-form">
            <h3>Sign up</h3>

            <div className="input-topics">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="full name"
                onChange={handleChange}
              />
            </div>

            <div className="input-topics">
              <label htmlFor="image">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="email"
                onChange={handleChange}
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
              />
            </div>

            <div className="input-topics">
              <label htmlFor="description">Repeat Password</label>
              <input
                type="password"
                name="repeatPassword"
                value={repeatPassword}
                placeholder="repeat password"
                onChange={handleChange}
              />
            </div>
            <p className="warning-msg">{errorMsg}</p>

            <p>
              Have an account already? <NavLink to="/login">Sign in</NavLink>
            </p>
            <div className="register-form__btn-save__wrapper">
              <button className="register-form__btn-register">Register</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default Register;
