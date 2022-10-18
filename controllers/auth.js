require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const _ = require("lodash");
const sgMail = require("@sendgrid/mail");
const User = require("../models/User");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

//POST request to API api/auth/google-auth
//DESCRIPTION - authenticates user with google login
//ACCESS Public
const googleLogin = (req, res) => {
  const { tokenId } = req.body;
  client
    .verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    .then((response) => {
      const { email_verified, name, email, picture } = response.payload;
      if (email_verified) {
        User.findOne({ email }).exec((err, user) => {
          if (err) {
            return res.status(400).json({
              msg: "Something went wrong",
            });
          } else {
            if (user) {
              jwt.sign(
                { id: user._id },
                process.env.jwtSecret,
                //we set an expiration for the token
                { expiresIn: "30d" },
                async (err, token) => {
                  if (err) throw err;
                  //we make a json file for token and user
                  await user
                    .populate("photos")
                    .populate({
                      path: "photos",
                      populate: {
                        path: "comments",
                      },
                    })
                    .execPopulate();
                  res.json({
                    token,
                    user: {
                      _id: user._id,
                      name: user.name,
                      email: user.email,
                      avatar: picture,
                      photos: user.photos,
                      medium: user.medium,
                      bio: user.bio,
                    },
                  });
                }
              );
            } else {
              const password = email + process.env.jwtSecret;
              const newUser = new User({
                name,
                email,
                password,
                avatar: picture,
              });
              newUser.save((err, user) => {
                if (err) {
                  return res.status(400).json({ msg: "Something went wrong" });
                }
                jwt.sign(
                  { id: user._id },
                  process.env.jwtSecret,
                  //we set an expiration for the token
                  { expiresIn: "30d" },
                  async (err, token) => {
                    if (err) throw err;
                    //we make a json file for token and user
                    const { _id, name, email, avatar } = newUser;
                    res.json({
                      token,
                      user: {
                        _id,
                        name,
                        email,
                        avatar,
                        photos: user.photos,
                        medium: user.medium,
                        bio: user.bio,
                      },
                    });
                  }
                );
              });
            }
          }
        });
      }
    });
};

//POST request to API api/auth
//DESCRIPTION - authenticates user
//ACCESS Public
const login = (req, res) => {
  //we destructure email and password from req.body
  const { email, password } = req.body;
  //simple validation not to leave the fields empty, else we throw a 400 bad request message
  if (!email || !password) {
    return res.status(400).json({ msg: "please enter all fields" });
  }
  //check for existing user, if it doesn't exist we throw a 400 bad request message
  User.findOne({ email }).then((user) => {
    if (!user)
      return res
        .status(400)
        .json({ msg: "there is no user register with this email" });
    //we validate password and compare the hashed password with req.body.password, if the password is different
    bcrypt.compare(password, user.password).then((isMatch) => {
      //this call back isMatch returns true or false value
      if (!isMatch)
        return res.status(400).json({ msg: "invalid username or password" });
      //if they match we sign the user and get the token
      jwt.sign(
        { id: user._id },
        process.env.jwtSecret,
        //we set an expiration for the token
        { expiresIn: "30d" },
        async (err, token) => {
          if (err) throw err;
          //we make a json file for token and user
          await user
            .populate("photos")
            .populate({
              path: "photos",
              populate: {
                path: "comments",
              },
            })
            .execPopulate();
          res.json({
            token,
            user: {
              _id: user._id,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
              photos: user.photos,
              medium: user.medium,
              bio: user.bio,
            },
          });
        }
      );
    });
  });
};

//GET request GET API api/auth/user
//DESCRIPTION - get user data
//ACCESS Private

//this will validate the user with the token
const findUser = (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .populate("photos")
    .populate("medium")
    .then((user) => res.json(user));
};

//@ROUTE PUT /v1/user/forgotPassword
//@DESC Requests a new passowrd
//@ACCESS: Private
//through this function the user can make a request with the email address to receive an email
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    User.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res
          .status(400)
          .json({ msg: "There is no user registered with this email" });
      } else {
        const token = jwt.sign(
          { id: user._id },
          process.env.RESET_PASSWORD_KEY,
          {
            expiresIn: 3700,
          }
        );
        const emailData = {
          // from: 'noreply@MYPixx.com',
          from: "michele.zucca@integrify.io",
          to: email,
          subject: "Password Reset Request",
          html: `
            <p>Hello,</p>
            <p>You have attempted a password reset request.</p>
            <a href="${process.env.CLIENT_URL}/reset-password/${token}">
            <h4>Click on this link to reset your password</h4></a>
            <p>If you have not requested a password reset, please disregard this email.</p>
            <p>MyPixx</p>`,
        };
        //the token will be stored here on the reset link
        return user.updateOne({ resetToken: token }, (err) => {
          if (err) {
            return res.status(404).json({ msg: "User not found" });
          } else {
            sgMail
              .send(emailData)
              .then(() => {
                return res.json({
                  msg: `An email has been sent to ${email} with instructions to reset your password`,
                });
              })
              .catch((err) => {
                return res.json({ msg: err.message });
              });
          }
        });
      }
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      next(new Error("Problem validating user"));
    } else {
      next(new Error("Something went wrong. Please refresh the page"));
    }
  }
};

//@ROUTE PUT /v1/user/reset-password
//@DESC Resets the password to a new one
//@ACCESS: Private
const resetPassword = async (req, res, next) => {
  try {
    //receives a new password and a token. reset link is sent from the client side
    const { newPassword, repeatNewPassword, resetToken } = req.body;
    if (newPassword !== repeatNewPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }
    if (resetToken) {
      //we will decode the token and convert it to an id
      jwt.verify(resetToken, process.env.RESET_PASSWORD_KEY, function (err) {
        if (err) {
          return res.status(401).json({
            msg: "token expired or invalid",
          });
        }
        //the reset link from the client side has to match the token on the database. it's the same token that the user gets sent on his email
        User.findOne({ resetToken }, (err, user) => {
          if (err || !user) {
            return res.status(404).json({ msg: "invalid token" });
          }
          const obj = {
            password: newPassword,
            resetToken: "",
          };
          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(obj.password, salt, (err, hash) => {
              if (err) throw err;
              obj.password = hash;
              //it will update the object in the database, the passowrd will be updated
              user = _.extend(user, obj);
              user.save((err) => {
                if (err) {
                  return res.status(400).json({ msg: "password reset error" });
                } else {
                  return res.status(200).json({
                    msg: "your password has been successfully changed",
                  });
                }
              });
            });
          });
        });
      });
    } else {
      return res.status(401).json({ msg: "Authentication Error" });
    }
  } catch (err) {
    next(new Error("Not found", err));
  }
};

module.exports = {
  login,
  googleLogin,
  forgotPassword,
  resetPassword,
  findUser,
};
