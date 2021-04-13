import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import GoogleLogin from "react-google-login";
import { login, googleLogin } from "../../redux/actions/authActions";
import { clearErrors } from "../../redux/actions/errorActions";

import "./style.scss";

const Login = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const errorMsg = useSelector((state) => state.error.msg.msg);
  const clientID = `917092315724-7rg232f22vkqflmabjcb3rrrah6u364u.apps.googleusercontent.com`

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

  const responseSuccessGoogle = (response) => {
    dispatch(googleLogin(response))
  }

  const responseFailureGoogle = () => {
  }
  
  return (
    <div className="login">
      <div className="login__form-container">
      <h2>Sign in to MyPixx</h2>
      <GoogleLogin
          clientId={clientID}
          buttonText="Sign in with Google"
          onSuccess={responseSuccessGoogle}
          onFailure={responseFailureGoogle}
          cookiePolicy={'single_host_origin'}
          render={renderProps => (
            <button onClick={renderProps.onClick} disabled={renderProps.disabled}
            className="google-auth-btn"
            >
              <i className="fab fa-google"></i><span>Sign In with Google</span></button>
          )}
        />
        <div className="login__divider">
          <hr className="login__divider-line-before">        
        </hr>
        <p>Or</p>
        </div>
      <form onSubmit={handleSubmit}>
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

        <div className="login__btn-wrapper">
          <button className="login__btn-login">Sign In</button>
        </div>
        <NavLink to="/forgot-password" className="login__forgot-password">Forgot Password?</NavLink>
        <p className="login__sign-in">
          Don't have an account yet? <NavLink to="/register">Sign up</NavLink>{" "}
          here
        </p>
      </form>
      </div>
    </div>
  );
};

export default Login;
