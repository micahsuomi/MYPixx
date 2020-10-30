const Comment = require("../models/Comment");
const User = require("../models/User");
const Photo = require("../models/Photo");

//@POST Route /api/photos/:id/comments
//@DEC posts a comment
//@ACCESS: private
const addComment = async (req, res) => {
  const id = req.params.id;

  try {
    Photo.findById(id, (err, photo) => {
      if (err) {
        return res.status(404).send("not found");
      } else {
        User.findOne({ _id: req.user.id }, (err, foundUser) => {
          if (err) {
            return res.status(404).json({ msg: "Not Found" });
          }
          const author = {
            id: req.user.id,
            name: foundUser.name,
            avatar: foundUser.avatar,
          };

          const newComment = new Comment({
            text: req.body.text,
            author: author,
          });

          newComment.save();
          photo.comments.push(newComment);
          photo.save().then((photo) => res.json(photo));
        });
      }
    });
  } catch (err) {
    return res.status(500).json({ msg: "Something went wrong" });
  }
};

//@PUT Route /api/photos/:id/comments/:id
//@DESC edits a comment
//@ACCESS: private
const editComment = async (req, res) => {
  try {
    const id = req.params.id;
    Comment.findById(id).then((comment) => {
      comment.text = req.body.text;
      comment.save().then((comment) => res.json(comment));
    });
  } catch (err) {
    return res.status(404).json({ success: false });
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
