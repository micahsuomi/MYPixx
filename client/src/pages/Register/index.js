import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import validator from "validator";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

import { register } from "../../redux/actions/authActions";
import FeedBack from "../../components/Feedback";
import {
  clearErrors,
  clearAllValidations,
} from "../../redux/actions/errorActions";
import {
  nameValidator,
  passwordValidator,
} from '../../validators'

import "./style.scss";

const inputStyleErr = {
  border: '2px solid red'
}
const inputStyleValidated = {
  border: '2px solid lightgrey'
}

const Register = ({ history }) => {
  const isValidated = useSelector((state) => state.user.isValidated);
  console.log(isValidated)
  const errorMsg = useSelector((state) => state.error.msg.msg);
  const [isRegistered, setIsRegistered] = useState(false);
  const dispatch = useDispatch();
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    repeatPassword: "",
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
    repeatPassword: false
  })

  const { name, email, password, repeatPassword } = newUser;

  const validate = () => {
    const errors = {
      name: '',
      email: '',
      password: '',
      repeatPassword: ''
    }
   
    if (touched.name && !name.match(nameValidator)) {
      errors.name = 'Full name should include only letters'
    }
    if (touched.name && !validator.isLength(name, { min: 2, max: 30 })) {
      errors.name = 'Name must be between 1 and 30 characters'
      console.log(errors.name)
    }
    if (touched.email && !validator.isEmail(email)) {
      errors.email = 'email should be a valid email format'
    }
    if (touched.password && !password.match(passwordValidator)) {
      errors.password = 'Password must be at least 8 characters long, include an uppercase character, a lowercase character, a number and a special character'
    }
    if (password !== repeatPassword) {
      errors.repeatPassword = 'passwords do not match'
    }
    return errors
  }

  const errors = validate()

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(register(newUser));
    setTimeout(() => {
      dispatch(clearErrors());
    }, 4000);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched({
      ...touched,
      [name]: true,
    })
  }

  useEffect(() => {
    if (isValidated) {
      setIsRegistered(true);
    }
  }, [dispatch, isValidated]);

  const redirectLogin = () => {
    history.push("/login");
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
        <div className="registration">
          <form onSubmit={handleSubmit} className="registration__form">
            <h2>Sign up to MyPixx</h2>

            <div className="input-topics">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                name="name"
                value={name}
                placeholder="full name"
                onChange={handleChange}
                onBlur={handleBlur}
                required={true}
              />
            </div>
            {errors.name && (
            <div>
              <FeedBack validationErr={errors.name} />
            </div>
          )}


            <div className="input-topics">
              <label htmlFor="image">Email</label>
              <input
                type="email"
                name="email"
                value={email}
                placeholder="email"
                onChange={handleChange}
                onBlur={handleBlur}
                required={true}
              />
            </div>
            {errors.email && (
            <div>
              <FeedBack validationErr={errors.email} />
            </div>
          )}

            <div className="input-topics">
              <label htmlFor="description">Password</label>
              <input
                type="password"
                name="password"
                value={password}
                placeholder="password"
                onChange={handleChange}
                onBlur={handleBlur}
                required={true}
              />
            </div>
            {errors.password && (
            <div>
              <FeedBack validationErr={errors.password} />
            </div>
          )}

            <div className="input-topics">
              <label htmlFor="description">Repeat Password</label>
              <input
                type="password"
                name="repeatPassword"
                value={repeatPassword}
                placeholder="repeat password"
                onChange={handleChange}
                onBlur={handleBlur}
                required={true}
                style={password !== repeatPassword ? inputStyleErr : inputStyleValidated}
                className="password-input"
              />
            </div>
            {errors.repeatPassword && (
            <div>
              <FeedBack validationErr={errors.repeatPassword} />
            </div>
          )}
            <p className="warning-msg">{errorMsg}</p>

            <p>
              Have an account already? <NavLink to="/login">Sign in</NavLink>
            </p>
            <div className="registration__btn-wrapper">
              {
                errors.name ||
                errors.email ||
                errors.password ||
                errors.repeatPassword ? 
                <button className="registration__btn-register--disabled" disabled>Sign Up</button>
                :
                <button className="registration__btn-register">Sign Up</button>

              }
            </div>
          </form>
        </div>
      )}
    </>
  );
};

Register.propTypes = {
  history: PropTypes.object
};

export default Register;
