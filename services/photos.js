const Photo = require("../models/Photo");
const Comment = require("../models/Comment");

function createPhoto(newPhoto) {
  return newPhoto.save();
}

function findAll() {
  return Photo.find()
    .sort({ createdAt: -1 })
    .populate({ path: "likes", select: "name" })
    .populate("comments")
    .exec();
}

async function findPhotoById(id) {
  return Photo.findById(id)
    .populate("comments")
    .populate("likes")
    .populate({
      path: "comments",
      populate: ({
        path: "replies",
        model: Comment
      })
    }) 
    .exec()
    .then((photo) => {
      if (!photo) {
        throw new Error(`Photo ${id} not found`);
      }
      // console.log('comments replies', photo.comments.replies)
      return photo;
    });
}

module.exports = {
  findAll,
  findPhotoById,
  createPhoto,
};
