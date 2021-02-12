const moment = require("moment");

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
    const photo = await PhotoService.findPhotoById(id);
    const user = await UserService.findUserById(userId);
    const author = {
      id: req.user.id,
      name: user.name,
      avatar: user.avatar,
    };
    const newComment = new Comment({
      text: req.body.text,
      author: author,
    });
    console.log('new comment here', newComment)
    const date = new Date();
    newComment.commentDate = moment(date).format('LL');
    newComment.save();
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
    const update = req.body;
    const updatedComment = await CommentService.updateComment(id, update)
    res.json(updatedComment)
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
  console.log('req prams id', id)
  Comment.findById(id)
    .populate("likes")
    .populate("replies")
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

const replyToComment = async(req, res, next) => {
  try {
    const id = req.params.id
    const foundComment = await CommentService.findCommentById(id);
    console.log('found comment here', foundComment)
    const userId = req.user.id
    const user = await UserService.findUserByReq(userId);
    console.log('user here', user)
  
      const author = {
        id: req.user.id,
        name: user.name,
        avatar: user.avatar,
      };
      const newReply = new Comment({
        text: req.body.text,
        author: author,
      });
      newReply.save()
      console.log('new reply', newReply)
      foundComment.replies.push(newReply)
      // foundComment.populate("replies").execPopulate()
      console.log('found comment', foundComment)
      foundComment.save().then((comment) => res.json(comment))
  }
  catch(err) {
    next(res.status(500).json({ msg: "Internal Server Error" }));
    console.log(err)
  }
 

}

//GET Route /api/photos/:id/comments:id
//GETs a single comment
//Access: public
const findComment = async (req, res) => {
  try {
    const id = req.params.id;
    const foundComment = await CommentService.findCommentById(id)
    res.json(foundComment);
  } catch (err) {
    return res.status(404).json({ msg: err });
  }
}

module.exports = {
  addComment,
  editComment,
  deleteComment,
  findComment,
  likeComment,
  replyToComment,
};
