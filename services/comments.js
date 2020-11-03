const Comment = require("../models/Comment");

async function findById(id) {
  return Comment.findById(id)
    .populate("likes")
    .exec()
    .then((comment) => {
      if (!comment) {
        throw new Error(`Comment ${id} not found`);
      }
      return comment;
    });
}

async function updateComment(id, update) {
  console.log("here daaaaamn");
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

module.export = {
  findById,
  updateComment,
};
