const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//User model
const User = require('../../models/User');

//POST route to register user
//ACCESS public

router.post('/', (req, res) => {
    const { name, email, password } = req.body;
    //if any of the fields are empty, throw warning with 400 err (bad request)
    if(!name || !email || !password) {
        res.status(400).json({ msg: 'please enter all fields'})
    }

    //check for existing user using the email, throw 400 err
    User.findOne({email})
    .then((user) => {
        if(user) return res.status(400).json({ msg: 'A user with this email is already registered'})
        const newUser = new User({
            name,
            email, 
            password
        })

        //if no user exists, generate salt which is used to hash a password with bcryptjs
        bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
                if(err) throw err;
                newUser.password = hash,
                //save the user as new user within mongoose schema
                newUser.save()
                .then((user) => {
                    //send the token, create object for user with id, name and user email
                    jwt.sign(
                        { id: user.id },
                        process.env.jwtSecret,
                        //we set an expiration for the token
                        { expiresIn: 3600},
                        (err, token) => {
                            if(err) throw err;
                            //we make a json file for token and user
                            res.json({
                                token,
                                user: {
                                    id: user.id,
                                    name: user.name,
                                    email: user.email
                                }
                            })
                        }


                    )
                })
                
            })
        })
    })

})

    

module.exports = router;