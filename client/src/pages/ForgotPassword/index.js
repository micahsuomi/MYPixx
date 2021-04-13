import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

import Dialog from "../../components/Dialog";
import { forgotPassword } from "../../redux/actions/authActions";
import { clearErrors } from "../../redux/actions/errorActions";
import { clearResetConfirmation } from "../../redux/actions/authActions";

import "./style.scss";

const ForgotPassword = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const errorMsg = useSelector((state) => state.error.msg.msg);
  const emailConfirmation = useSelector(
    (state) => state.user.forgotPasswordConfirmation
  );
  const dispatch = useDispatch();
  const [userEmail, setUserEmail] = useState({
    email: "",
  });
  const [openDialog, setOpenDialog] = useState(false);
  const dialogText = 'Back to Home'
  const { email } = userEmail;

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(forgotPassword(userEmail));
    setTimeout(() => {
      dispatch(clearErrors());
    }, 4000);
  };

  const closeOpenDialog = () => {
    setOpenDialog(false);
    props.history.push("/");
    dispatch(clearResetConfirmation());
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUserEmail({
      ...userEmail,
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
    <div className="forgot-password">
      {emailConfirmation !== "" ? (
        <Dialog
          confirmation={emailConfirmation}
          closeOpenDialog={closeOpenDialog}
          dialogText={dialogText}
        />
      ) : (
        <form onSubmit={handleSubmit} className="forgot-password__form">
          <h2>Forgot Password?</h2>
          <p>
            Enter the email address you used to register. We will send you
            instructions on how to reset your password.
          </p>
          <p className="warning-msg">{errorMsg}</p>
          <div className="input-topics">
            <label htmlFor="image">Email</label>
            <input
              type="email"
              name="email"
              value={email}
              placeholder="enter your email address"
              onChange={handleChange}
              required={true}
            />
          </div>

          <div className="forgot-password__btn-wrapper">
            <button className="forgot-password__btn-submit-email">
              Submit
            </button>
          </div>
            <NavLink to="/login">Cancel</NavLink>{" "}
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
