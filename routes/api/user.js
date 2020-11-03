const express = require("express");
const router = express.Router();

const isAuthorized = require("../../middleware/authorized");

const {
  register,
  findAll,
  findOne,
  updateUser,
} = require("../../controllers/user");

router.post("/", register);
router.get("/", findAll);
router.get("/:id", findOne);
router.put("/:id", isAuthorized, updateUser);

module.exports = router;
