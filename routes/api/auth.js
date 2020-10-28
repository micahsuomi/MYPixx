const express = require("express");
const router = express.Router();

const { login, findUser } = require("../../controllers/auth");

//GET request to API api/auth
//DESCRIPTION - authenticates user
//ACCESS Public
router.post("/", login);

//GET request GET API api/auth/user
//DESCRIPTION - get user data
//ACCESS Private
//this will validate the user with the token
router.get("/user", findUser);

module.exports = router;
