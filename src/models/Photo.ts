import mongoose, { Document } from 'mongoose'
import { UserDocument } from './User'

export type PhotoDocument = Document & {
  title: string;
  image: string;
  author: UserDocument[];
  type: string;
  medium: string[];
  description: string;
  createdAt: string;
  likes: UserDocument[];
  comments: any;
  pull: Function;
}

const photoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  author: {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    name: String,
    avatar: String,
  },
  type: {
    type: String,
    required: true,
  },
  medium: {
    type: [String],
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
  ],
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment',
    },
  ],
})

export default mongoose.model<PhotoDocument>('Photo', photoSchema)
