require ('dotenv').config();

const User = require('../models/Photo');

const findUser = (req, res, next) => {
    User.findById(req.user.id)
    console.log(req.user.id)

}

module.export = findUser;