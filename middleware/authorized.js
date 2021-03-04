require("dotenv").config();
const jwt = require("jsonwebtoken");

console.log("jwt", jwt);
const authorized = (req, res, next) => {
  const token = req.header("x-auth-token");
  console.log("this is the token from middleware auth", token);
  if (!token)
    return res.status(401).json({ msg: "no token, authorization denied" });

  try {
    //verify token
    console.log('verify', process.env.jwtSecret)
    const decoded = jwt.verify(token, process.env.jwtSecret);
    console.log(decoded)
    //Add user from payload
    req.user = decoded;
    console.log("this is req.user from middleware", req.user);
    next();
  } catch (e) {
    console.log(e)
    res.status(400).json({ msg: "token is not valid" });
  }
};

module.exports = authorized;
