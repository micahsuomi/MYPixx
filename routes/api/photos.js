const express = require("express");
const router = express.Router();

const isAuthorized = require("../../middleware/authorized");

const {
  findAll,
  addPhoto,
  editPhoto,
  deletePhoto,
  likePhoto,
  findAllLikes,
  findAllComments,
} = require("../../controllers/photos");

router.get("/", findAll);
router.post("/", isAuthorized, addPhoto);
router.put("/:id", isAuthorized, editPhoto);
router.delete("/:id", isAuthorized, deletePhoto);
router.post("/:id/like", isAuthorized, likePhoto);
router.get("/:id/likes", findAllLikes);
router.get("/:id/comments", findAllComments);

module.exports = router;
