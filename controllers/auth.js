const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const isAuthorized = require('../middleware/authorized');
const User = require('../models/User');


//GET request to API api/auth
//DESCRIPTION - authenticates user
//ACCESS Public
const login = ('/', (req, res) => {
    //we destructure email and password from req.body
    let { email, password } = req.body;
    
    //simple validation not to leave the fields empty, else we throw a 400 bad request message
    if(!email || !password) {
        return res.status(400).json({msg: 'please enter all fields'})
    }
    //check for existing user, if it doesn't exist we throw a 400 bad request message
    User.findOne({email})
    .then((user) => {
        if(!user) return res.status(400).json({ msg: 'there is no user register with this email'})
        //we validate password and compare the hashed password with req.body.password, if the password is different 
        bcrypt.compare(password, user.password)
        .then(isMatch => {
            //this call back isMatch returns true or false value
            if(!isMatch) return res.status(400).json({ msg: 'invalid username or password'})
            console.log(isMatch)
                //if they match we sign the user and get the token

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
                            email: user.email,
                            avatar: user.avatar
                        }
                    })
                    console.log('this is coming from login route', token, user)
                }


            )
        })


    })
    

})

//GET request GET API api/auth/user
//DESCRIPTION - get user data
//ACCESS Private

//this will validate the user with the token
const findUser = (isAuthorized, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user =>  res.json(user))
   
})

module.exports = {
    login: login,
    findUser: findUser

};

