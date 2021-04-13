const multer = require("multer");
const cloudinary = require("cloudinary");
const moment = require("moment");

const User = require("../models/User");
const Photo = require("../models/Photo");
const Comment = require("../models/Comment");
const PhotoService = require("../services/photos");
const UserService = require("../services/users");
const CommentService = require("../services/comments");

//Ckoudinary to upload images
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

//GET Route /api/photos
//Description: get all photos
//ACCESS: public
const findAll = async (req, res) => {
  try {
    res.json(await PhotoService.findAll());
  } catch (err) {
    res.status(404).json({ msg: "Not Found" });
  }
};

//POST Route /api/photos
//Description: adds a new photo
//ACCESS: private
const addPhoto =
  (upload.single("image"),
  async(req, res, next) => {
    try {
      const userId = req.user.id;
      const user = await UserService.findUserByReq(userId);
      const { title, type, medium, description } = req.body;
      const fileImage = req.body.image;
      cloudinary.uploader.upload(fileImage, function (result) {
        const uploadedCloudinaryImage = result.secure_url;
        const author = {
          id: req.user.id,
          name: user.name,
          avatar: user.avatar,
        };
        // console.log('this is the author', author)

        const newPhoto = new Photo({
          title,
          image: uploadedCloudinaryImage,
          type,
          medium,
          description,
          author
        });
        const date = new Date();
        newPhoto.createdAt = moment(date).format('LL');
        console.log('photo before saving', newPhoto)

        newPhoto.save();
        user.photos.push(newPhoto);
        user.populate("photos").execPopulate()

        user.save();
        console.log('user here', user)
        res.json(newPhoto);

      });
    } catch (err) {
      next(res.status(500).json({ err: "Something went wrong" }));
    }
  });

//EDIT Route /api/photos/:id
//Description: edits one photo item
//ACCESS: private
const editPhoto =
  (upload.single("image"),
  async (req, res) => {
    try {
      const id = req.params.id;
      let { title, type, medium, description } = req.body;
      const fileImage = req.body.image;
      cloudinary.uploader.upload(fileImage, function (result) {
        const uploadedCloudinaryImage = result.secure_url;
        Photo.findById(id).then((photo) => {
          (photo.title = title),
            (photo.image = uploadedCloudinaryImage),
            (photo.type = type),
            (photo.medium = medium),
            (photo.description = description);
          photo.save().then((updatedPhoto) => res.json(updatedPhoto));
        });
      });
    } catch (err) {
      return res.status(404).json({ success: false });
    }
  });

//DELETE Route /api/photos/:id
//Description: deletes one photo item
//ACCESS: private
const deletePhoto = async (req, res) => {
  try {
    const id = req.params.id;
    const photo = await Photo.findById(id)
      photo.remove()
      res.json({ success: true })
  } catch (err) {
    return res.status(404).json({ success: false });
  }
};

//POST Route /api/photos/:id/like
//DESC Adds a like to a photo
//ACCESS: private
const likePhoto = (req, res) => {
  const id = req.params.id;
  console.log("req.user from like photo", req.user);

  Photo.findById(id, (err, photo) => {
    if (err) {
      return res.status(404).json({ msg: "Not found" });
    } else {
      let newLike = { _id: req.user.id };
      const foundUser = photo.likes.some((like) => like.equals(req.user.id));
      foundUser ? photo.likes.pull(newLike) : photo.likes.push(newLike);
      photo
        .save()
        .then((photo) => res.json(photo))
        .catch((err) => res.status(404).json({ success: false }));
    }
  });
};

//GET Route /api/photos/:id/comments
//GET all comments for a photo
//Access: public
const findPhotoById = async (req, res) => {
  try {
    const id = req.params.id;
    const photo = await PhotoService.findPhotoById(id)
    // console.log('photo', photo)
    // photo.comments.forEach((comment) => comment.populate("reply").execPopulate())
    for(const comment of photo.comments) {
      comment.populate("likes").execPopulate()
    }
    res.json(photo)
    
  } catch (err) {
    return res.status(404).json({ msg: err });
  }
};

module.exports = {
  findAll,
  findPhotoById,
  addPhoto,
  editPhoto,
  deletePhoto,
  likePhoto,
};
