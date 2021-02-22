const express = require("express");
const router = express.Router();

const isAuthorized = require("../../middleware/authorized");

const { login, findUser } = require("../../controllers/auth");

router.post("/", login);
router.get("/user", isAuthorized, findUser);

module.exports = router;
