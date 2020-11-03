const Comment = require("../models/Comment");
const User = require("../models/User");
const Photo = require("../models/Photo");
const PhotoService = require("../services/photos");
const CommentService = require("../services/comments");
const UserService = require("../services/users");

//@POST Route /api/photos/:id/comments
//@DEC posts a comment
//@ACCESS: private
const addComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    const userId = req.user.id;
    const photo = await PhotoService.findById(id);
    const user = await UserService.findUserByReq(userId);

    const author = {
      id: req.user.id,
      name: user.name,
      avatar: user.avatar,
    };
    const newComment = new Comment({
      text: req.body.text,
      author: author,
    });

    const date = new Date();
    newComment.commentDate = date.toISOString().split("T")[0];
    newComment.save();
    console.log("new comment here", newComment);
    photo.comments.push(newComment);
    photo.save().then((photo) => res.json(photo));
  } catch (err) {
    next(res.status(500).json({ msg: "Something went wrong" }));
  }
};

//@PUT Route /api/photos/:id/comments/:id
//@DESC edits a comment
//@ACCESS: private
const editComment = async (req, res, next) => {
  try {
    const id = req.params.id;
    Comment.findById(id).then((comment) => {
      comment.text = req.body.text;
      comment.save().then((comment) => res.json(comment));
    });
  } catch (err) {
    next(res.status(500).json({ msg: "Internal Server Error" }));
  }
};

//@DELETE Route /api/photos/:id/comments/:id
//@DESC deletes a comment
//@ACCESS: private
const deleteComment = (req, res) => {
  const id = req.params.id;
  Comment.findById(id)
    .then((comment) => comment.remove().then(() => res.json({ success: true })))
    .catch((err) => res.status(404).json({ success: false }));
};

//POST Route /api/photos/:id/comments/:id/like
//@DESC likes a comment
//@ACCESS: private
const likeComment = (req, res) => {
  const id = req.params.id;

  Comment.findById(id)
    .populate("likes")
    .exec((err, comment) => {
      if (err) {
        return res.status(404).json({ msg: "Not found" });
      } else {
        let newLike = { _id: req.user.id };
        const foundUser = comment.likes.some((like) =>
          like.equals(req.user.id)
        );
        foundUser ? comment.likes.pull(newLike) : comment.likes.push(newLike);
        console.log("updating comment", comment);
        comment
          .save()
          .then((comment) => res.json(comment))
          .catch((err) => res.status(404).json({ success: false }));
      }
    });
};

//GET Route /api/photos/:id/comments:id
//GET all likes for a comment
//Access: public
const findAllCommentLikes = async (req, res) => {
  try {
    const id = req.params.id;
    const comment = await Comment.findById(id).populate("likes").exec();
    res.json(comment.likes);
  } catch (err) {
    return res.status(404).json({ msg: "Not found" });
  }
};

module.exports = {
  addComment: addComment,
  editComment: editComment,
  deleteComment: deleteComment,
  likeComment: likeComment,
  findAllCommentLikes: findAllCommentLikes,
};
