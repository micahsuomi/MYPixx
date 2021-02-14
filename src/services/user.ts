import User, { UserDocument } from '../models/User'

function findAllUsers(): Promise<UserDocument[]> {
  return User.find().select('-password').populate('photos').exec()
}

async function findUserById(userId: string): Promise<UserDocument> {
  console.log('from services', userId)

  return User.findById(userId)
    .select('-password')
    .populate('photos')
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`User ${userId} not found`)
      }
      return user
    })
}

async function findUserByReq(userId: string): Promise<UserDocument> {
  return User.findOne({ _id: userId })
    .select('-password')
    .select('-comments')
    .select('-likes')
    .exec()
    .then((user) => {
      if (!user) {
        throw new Error(`User ${userId} not found`)
      }
      return user
    })
}

export default {
  findAllUsers,
  findUserById,
  findUserByReq,
}
