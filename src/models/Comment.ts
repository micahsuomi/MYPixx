import mongoose, { Document } from 'mongoose'
import { UserDocument } from './User'

export type CommentDocument = Document & {
  text: string;
  author: UserDocument[];
  commentDate: string;
  createdAt: string;
  likes: UserDocument[];
  replies: CommentDocument[];
}

const commentSchema = new mongoose.Schema({
  text: {
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
  commentDate: {
    type: String,
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
  replies: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'comment',
    },
  ],
})

export default mongoose.model<CommentDocument>('Comment', commentSchema)
