const Comment = require("../models/Comment");

async function findAllComments() {
  return Comment.find().populate("likes").populate("replies").exec()
}

async function findCommentById(id) {
  return Comment.findById(id)
    .populate("likes")
    .populate("replies")
    .exec()
    .then((comment) => {
      if (!comment) {
        throw new Error(`Comment ${id} not found`);
      }
      return comment;
    });
}

async function updateComment(id, update) {
  return Comment.findById(id)
    .exec()
    .then((comment) => {
      console.log("from services", update);
      if (!comment) {
        throw new Error(`Comment ${id} not found`);
      }
      if (update.text) {
        comment.text = update.text;
      }
      console.log("from services", comment);
      return comment.save();
    });
}

module.exports = {
  findAllComments,
  findCommentById,
  updateComment,
};
