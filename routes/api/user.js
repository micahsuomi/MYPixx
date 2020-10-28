const express = require("express");
const router = express.Router();

const {
  register,
  findAll,
  findOne,
  updateUser,
} = require("../../controllers/user");

router.post("/", register);
router.get("/", findAll);
router.get("/:id", findOne);
router.put("/:id", updateUser);

module.exports = router;
