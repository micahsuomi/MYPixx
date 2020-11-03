const Photo = require("../models/Photo");

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

async function findById(id) {
  return Photo.findById(id)
    .populate("comments")
    .populate("likes")
    .exec()
    .then((photo) => {
      if (!photo) {
        throw new Error(`Photo ${id} not found`);
      }
      return photo;
    });
}

module.exports = {
  findAll,
  findById,
  createPhoto,
};
