const express = require("express");
const router = express.Router();

const isAuthorized = require("../../middleware/authorized");

const {
  findAll,
  findPhotoById,
  addPhoto,
  editPhoto,
  deletePhoto,
  likePhoto,
} = require("../../controllers/photos");

router.get("/", findAll);
router.get("/:id", findPhotoById);
router.post("/", isAuthorized, addPhoto);
router.put("/:id", isAuthorized, editPhoto);
router.delete("/:id", isAuthorized, deletePhoto);
router.post("/:id/like", isAuthorized, likePhoto);

module.exports = router;
