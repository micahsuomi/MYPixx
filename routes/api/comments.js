const express = require("express");
const router = express.Router({ mergeParams: true });
const isAuthorized = require("../../middleware/authorized");

const {
  addComment,
  editComment,
  deleteComment,
  likeComment,
  findAllCommentLikes,
} = require("../../controllers/comments");

router.post("/", isAuthorized, addComment);
router.put("/:id", isAuthorized, editComment);
router.delete("/:id", isAuthorized, deleteComment);
router.post("/:id/like", isAuthorized, likeComment);
router.get("/:id/likes", findAllCommentLikes);

module.exports = router;
