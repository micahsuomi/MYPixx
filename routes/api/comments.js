const express = require("express");
const router = express.Router({ mergeParams: true });
const isAuthorized = require("../../middleware/authorized");

const {
  addComment,
  editComment,
  deleteComment,
  findComment,
  likeComment,
  replyToComment,
} = require("../../controllers/comments");

router.post("/", isAuthorized, addComment);
router.put("/:id", isAuthorized, editComment);
router.delete("/:id", isAuthorized, deleteComment);
router.post("/:id/like", isAuthorized, likeComment);
router.post("/:id", isAuthorized, replyToComment);
router.get("/:id", findComment);

module.exports = router;
