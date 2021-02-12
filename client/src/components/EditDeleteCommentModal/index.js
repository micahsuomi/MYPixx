import React from "react";

import "./style.scss";

const EditDeleteCommentModal = ({
  openEditComment,
  deleteOnClick
}) => {
  return (
    <div className="edit-delete-comment animate-modal">
    <i
      className="fas fa-pen edit-delete-comment__edit-btn grow"
      onClick={openEditComment}
    >
      <span> Edit</span>
    </i>

    <i
      className="fas fa-trash edit-delete-comment__delete-btn grow"
      onClick={deleteOnClick}
    >
      <span> Delete</span>
    </i>
  </div>
  );
};

export default EditDeleteCommentModal;
