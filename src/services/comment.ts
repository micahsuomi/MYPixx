import Comment, { CommentDocument } from '../models/Comment'

async function findAllComments(): Promise<CommentDocument[]> {
  return Comment.find().populate('likes').populate('replies').exec()
}

async function findCommentById(id: string): Promise<CommentDocument> {
  return Comment.findById(id)
    .populate('likes')
    .populate('replies')
    .exec()
    .then((comment) => {
      if (!comment) {
        throw new Error(`Comment ${id} not found`) 
      }
      return comment
    })
}


async function updateComment(id: string, update: Partial<CommentDocument>): Promise<CommentDocument> {
  return Comment.findById(id)
    .exec()
    .then((comment) => {
      console.log('from services', update)
      if (!comment) {
        throw new Error(`Comment ${id} not found`)
      }
      if (update.text) {
        comment.text = update.text
      }
      console.log('from services', comment)
      return comment.save()
    })
}

export default {
  findAllComments,
  findCommentById,
  updateComment,
}
