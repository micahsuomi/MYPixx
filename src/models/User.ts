import mongoose, { Document } from 'mongoose'
import { PhotoDocument } from './Photo'

export type UserDocument = Document & {
  name: string;
  email: string;
  password: string;
  registeredAt: string;
  avatar: string;
  bio: string;
  medium: string[];
  photos: PhotoDocument[];
  pull: Function;
}

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  registeredAt: {
    type: Date,
    default: Date.now,
  },
  bio: {
    type: String
  },
  avatar: {
    type: String
  },
  medium: {
    type: [String],
  },

  photos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'photo',
    },
  ],
})

export default mongoose.model<UserDocument>('User', userSchema)
