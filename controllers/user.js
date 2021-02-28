const bcrypt = require("bcryptjs");
const multer = require("multer");
const cloudinary = require("cloudinary");

const User = require("../models/User");
const Photo = require("../models/Photo");
const Comment = require("../models/Comment");
const UserService = require("../services/users");

const {
  nameValidator,
  emailValidator,
  passwordValidator,
} = require("../validators/regex");

const storage = multer.diskStorage({
  filename: function (req, file, callback) {
    callback(null, Date.now() + file.originalname);
  },
});
const imageFilter = function (req, file, cb) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });

cloudinary.config({
  cloud_name: "du66vzeok",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

//@POST ROUTE /api/user
//@DESC - registers user
//@ACCESS Public
const register = async (req, res) => {
  const { name, email, password, repeatPassword } = req.body;
  //if any of the fields are empty, throw warning with 400 err (bad request)
  if (!name || !email || !password || !repeatPassword) {
    res.status(400).json({ msg: "please enter all fields" });
  }
  //check all validators
  if (!name.match(nameValidator)) {
    console.log("here first last name");
    return res
      .status(400)
      .json({ msg: "Full Name must include 3-16 characters" });
  }
  if (!email.match(emailValidator)) {
    return res.status(400).json({
      msg: "Email must be a valid address, e.g. example@example.com",
    });
  }
  if (!password.match(passwordValidator)) {
    return res.status(400).json({
      msg:
        "Password must be at least 8 characters long, include an uppercase character, a lowercase character, a number and a special character",
    });
  }
  //check for password match
  if (!password.match(repeatPassword)) {
    return res.status(400).json({
      msg: "Passwords do not match",
    });
  }
  //check for existing user using the email, throw 400 err
  User.findOne({ email }).then((user) => {
    if (user)
      return (
        res
          .status(400)
          .json({ msg: "A user with this email is already registered" })
      );
    const newUser = new User({
      name,
      email,
      password,
    });
    console.log("new user", newUser);
    //if no user exists, generate salt which is used to hash a password with bcryptjs
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newUser.password, salt, (err, hash) => {
        if (err) throw err;
        (newUser.password = hash),
          //save the user as new user within mongoose schema

          newUser.save().then((user) => {
            console.log("user after saving", user);
            //we make a json file for token and user
            res.json({
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                photos: user.photos,
                medium: user.medium,
                bio: user.bio,
              },
            });
          });
      });
    });
  });
};

//@GET ROUTE /api/v1/user
//@DESC - finds all users
//@ACCESS Public
const findAll = async (req, res) => {
  try {
    const user = await UserService.findAllUsers();
    res.json(user);
  } catch (err) {
    return res.status(404).json({ msg: "Not Found" });
  }
};

//@GET ROUTE /api/v1/user/:id
//@DESC - finds  a single user
//@ACCESS Public
const findOne = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserService.findUserById(userId);
    const userPhotos = await Photo.find()
      .where("author.id")
      .equals(user._id)
      .populate("comments")
      .exec();
    user.photos = userPhotos;
    console.log("calling this controller", user);
    res.json(user);
  } catch (err) {
    return res.status(404).json({ msg: "Not Found" });
  }
};

//@PUT ROUTE /api/v1/user/:id
//@DESC - updates a user
//@ACCESS Private

const updateUser =
  (upload.single("image"),
  async (req, res) => {
    const id = req.params.id;
    const { name, email, medium, bio } = req.body;
    const fileImage = req.body.avatar;
    cloudinary.uploader.upload(fileImage, function (result) {
      const uploadedCloudinaryImage = result.secure_url;

      User.findById(id)
        .populate("photos")
        .exec()
        .then((user) => {
          console.log(user);
          (user.name = name),
            (user.email = email),
            (user.avatar = uploadedCloudinaryImage),
            (user.medium = medium),
            (user.bio = bio);
          Photo.find()
            .where("author.id")
            .equals(user._id)
            .populate("comments")
            .exec((err, foundGallery) => {
              if (err) {
                return res.status(404).json({ msg: "Not found" });
              } else {
                for (const gallery of foundGallery) {
                  gallery.author.name = user.name;
                  gallery.author.avatar = user.avatar;
                  gallery.author.bio = user.bio;
                  console.log("here the gallery should update", gallery);
                }
              }

              //to save all the multiple updated mongoose documents

              let total = foundGallery.length;
              const result = [];
              if (total > 0) {
                const saveAll = () => {
                  const doc = foundGallery.pop();

                  doc.save((err, saved) => {
                    if (err) throw err; //handle error
                    result.push(saved[0]);
                    console.log(result);
                    if (--total) saveAll();
                    else console.log("saved here"); // all saved here
                  });
                };

                saveAll();
                Comment.find()
                  .where("author.id")
                  .equals(user._id)
                  .exec((err, foundComments) => {
                    if (err) {
                      console.log(err);
                    } else {
                      for (const comment of foundComments) {
                        comment.author.name = user.name;
                        comment.author.avatar = user.avatar;
                        console.log("here the gallery should update", comment);
                      }
                    }

                    //to save all the multiple updated mongoose documents

                    let total = foundComments.length;
                    const result = [];
                    if (total > 0) {
                      const saveAll = () => {
                        const doc = foundComments.pop();

                        doc.save((err, saved) => {
                          if (err) throw err; //handle error
                          result.push(saved[0]);
                          if (--total) saveAll();
                          else console.log("saved here"); // all saved here
                        });
                      };

                      saveAll();
                    }
                  });
              }

              user.save().then((updatedUser) => res.json(updatedUser));
            });
        })
        .catch((err) => res.status(404).json({ err: "server error" }));
    });
  });

module.exports = {
  register,
  findAll,
  findOne,
  updateUser,
};
