const Photo = require("../models/Photo");

function createPhoto(photo) {
  return photo.save();
}

function findAll() {
  return Photo.find()
    .sort({ createdAt: -1 })
    .populate({ path: "likes", select: "name" })
    .populate("comments")
    .exec();
}

module.exports = {
  findAll: findAll,
  createPhoto: createPhoto,
};
