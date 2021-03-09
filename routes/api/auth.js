const express = require("express");
const router = express.Router();

const isAuthorized = require("../../middleware/authorized");

const {
  login,
  googleLogin,
  forgotPassword,
  resetPassword,
  findUser,
} = require("../../controllers/auth");

router.post("/", login);
router.post("/google-auth", googleLogin);
router.put("/forgot-password", forgotPassword);
router.put("/reset-password", resetPassword);
router.get("/user", isAuthorized, findUser);

module.exports = router;
