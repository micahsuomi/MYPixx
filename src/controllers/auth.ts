import { Request, Response, NextFunction } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import {
  JWT_SECRET
} from '../util/secrets'

import { RequestUser } from '../middlewares/authorized'

import User, { UserDocument } from '../models/User'
import UserService from '../services/user'

//GET request to API api/auth
//DESCRIPTION - authenticates user
//ACCESS Public
export const login = (
  req: Request, 
  res: Response,
  next: NextFunction
  ) => {
    //we destructure email and password from req.body
    const { email, password } = req.body
    console.log('req body', email, password)
    //simple validation not to leave the fields empty, else we throw a 400 bad request message
    if (!email || !password) {
      return res.status(400).json({ msg: 'please enter all fields' })
    }
    //check for existing user, if it doesn't exist we throw a 400 bad request message
    User.findOne({ email }).then((user) => {
      console.log(' here is the user', user)

      if (!user)
        return res
          .status(400)
          .json({ msg: 'there is no user register with this email' })
      //we validate password and compare the hashed password with req.body.password, if the password is different
      bcrypt.compare(password, user.password).then((isMatch: any) => {
        //this call back isMatch returns true or false value
        if (!isMatch)
          return res.status(400).json({ msg: 'invalid username or password' })
        //if they match we sign the user and get the token

        jwt.sign(
          { id: user._id },
          JWT_SECRET,
          //we set an expiration for the token
          { expiresIn: '30d' },
          async (err, token) => {
            if (err) throw err
            //we make a json file for token and user
            console.log('user is here', user)
            await user.populate('photos').execPopulate()
            res.json({
              token,
              user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                photos: user.photos,
                medium: user.medium,
                bio: user.bio
              },
            })
            console.log('this is coming from login route', user)
          }
        )
      })
    })
  }

//GET request GET API api/auth/user
//DESCRIPTION - get user data
//ACCESS Private

//this will validate the user with the token
export const findUser = (
  req: Request, 
  res: Response) => {
    const { userId } = req.user as RequestUser
    User.findById(userId)
      .select('-password')
      .populate('photos')
      .populate('medium')
      .then((user: any) => res.json(user))
  }

