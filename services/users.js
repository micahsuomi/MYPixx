const User = require("../models/User");

function findAllUsers() {
  return User.find()
  .select("-password")
  .populate("photos")
  .populate({
    path: "photos",
    populate: ({
      path: "comments"
    })
  }) 
  .populate({
    path: "photos",
    populate: ({
      path: "likes"
    })
  }) 
  .exec();
}

async function findUserById(userId) {
  return User.findById(userId)
    .select("-password")
    .populate("photos")
    .populate({
      path: "photos",
      populate: ({
        path: "comments"
      })
    }) 
    .populate({
      path: "photos",
      populate: ({
        path: "likes"
      })
    }) 
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`User ${userId} not found`);
      }
      return user;
    });
}

async function findUserByReq(userId) {
  return User.findOne({ _id: userId })
    .select("-password")
    .select("-comments")
    .select("-likes")
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`User ${userId} not found`);
      }
      return user;
    });
}

module.exports = {
  findAllUsers,
  findUserById,
  findUserByReq,
};
