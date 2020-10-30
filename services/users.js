const User = require("../models/User");

function findAllUsers() {
    return User.find()
        .select("-password")
        .populate("photos")
        .exec();
}

async function findUserById(userId) {
    return User.findById(userId)
        .select("-password")
        .populate("photos")
        .exec()
        .then((user) => {
            if (!user) {
                throw new Error(`User ${userId} not found`)
            }
            return user
        })
}

module.exports = {
    findAllUsers,
    findUserById
};
