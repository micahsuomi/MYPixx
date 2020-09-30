const express = require('express');
const router = express.Router();

const {
    register,
    findAll,
    findOne,
    updateUser
} = require('../../controllers/user'); 

//POST route to register user
//ACCESS public
router.post('/', register);

//GETS all users
//Access: public
router.get('/', findAll)

//Gets a single user
//Access: public
router.get('/:id', findOne)

//UPDATES user
//access: private
router.put('/:id', updateUser)

module.exports = router;