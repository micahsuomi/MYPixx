import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { resetPassword, clearResetConfirmation } from "../../redux/actions/authActions";
import FeedBack from "../../components/Feedback";
import Dialog from "../../components/Dialog";
import {
  clearErrors,
} from "../../redux/actions/errorActions";
import {
  passwordValidator,
} from '../../validators'

import "./style.scss";

const inputStyleErr = {
  border: '2px solid red'
}
const inputStyleValidated = {
  border: '2px solid lightgrey'
}

const ResetPassword = (props) => {
  const errorMsg = useSelector((state) => state.error.msg.msg);
  const resetPasswordConfirmation = useSelector(
    (state) => state.user.forgotPasswordConfirmation
  );
  const dispatch = useDispatch();
  const [userPassword, setUserPassword] = useState({
    newPassword: "",
    repeatNewPassword: "",
  });

  const [touched, setTouched] = useState({
    newPassword: false,
    repeatNewPassword: false
  })
  const [openDialog, setOpenDialog] = useState(false);
  const { newPassword, repeatNewPassword } = userPassword;
  const dialogText = 'Back to Login'

  const validate = () => {
    const errors = {
      newPassword: '',
      repeatNewPassword: '',
    }
   
    if (touched.newPassword && !newPassword.match(passwordValidator)) {
      errors.newPassword = 'Password must be at least 8 characters long, include an uppercase character, a lowercase character, a number and a special character'
    }
    if (newPassword !== repeatNewPassword) {
      errors.repeatNewPassword = 'passwords do not match'
    }
    return errors
  }

  const errors = validate()

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPasswordRequest = {
      newPassword,
      repeatNewPassword,
      resetToken: props.match.params.token
    };
    dispatch(resetPassword(newPasswordRequest));
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setUserPassword({
      ...userPassword,
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

  const closeOpenDialog = () => {
    setOpenDialog(false);
    props.history.push("/login");
    dispatch(clearResetConfirmation());
  };

  return (
    <>
        <div className="forgot-password">
        { resetPasswordConfirmation !== "" ? (
        <Dialog
          confirmation={resetPasswordConfirmation}
          closeOpenDialog={closeOpenDialog}
          dialogText={dialogText}
        />
      ) : (
          <form onSubmit={handleSubmit} className="registration__form">
            <h2>Reset Your Password</h2>
            <div className="input-topics">
              <label htmlFor="description">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                placeholder="new password"
                onChange={handleChange}
                onBlur={handleBlur}
                required={true}
              />
            </div>
            {errors.newPassword && (
            <div>
              <FeedBack validationErr={errors.newPassword} />
            </div>
          )}

            <div className="input-topics">
              <label htmlFor="description">Repeat New Password</label>
              <input
                type="password"
                name="repeatNewPassword"
                value={repeatNewPassword}
                placeholder="repeat new password"
                onChange={handleChange}
                onBlur={handleBlur}
                required={true}
                style={newPassword !== repeatNewPassword ? inputStyleErr : inputStyleValidated}
                className="password-input"
              />
            </div>
            {errors.repeatNewPassword && (
            <div>
              <FeedBack validationErr={errors.repeatNewPassword} />
            </div>
          )}
            <p className="warning-msg">{errorMsg}</p>
            <div className="registration__btn-wrapper">
              {
                errors.newPassword ||
                errors.repeatNewPassword ? 
                <button className="registration__btn-register--disabled" disabled>Submit</button>
                :
                <button className="registration__btn-register">Submit</button>

              }
            </div>
          </form>
          )}
        </div>
    </>
  );
};

export default ResetPassword;
