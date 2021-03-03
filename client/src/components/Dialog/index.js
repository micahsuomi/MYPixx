import React from 'react';

import "./style.scss";

const Dialog = ({ confirmation, closeOpenDialog, dialogText }) => {
    return (
        <div className="forgot-password-dialog">
        <div className="forgot-password-dialog__container animate-modal">
        <h2>Success!</h2>
          <p close={closeOpenDialog}>
            {confirmation} 
          </p>
          <div className="forgot-password-dialog__btn-wrapper">
            <button
              className="forgot-password-dialog__btn-close"
              onClick={closeOpenDialog}
            >
              {dialogText}
            </button>
          </div>
        </div>
        </div>
    )
}

export default Dialog;
