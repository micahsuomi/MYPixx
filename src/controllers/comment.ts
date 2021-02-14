import { Request, Response, NextFunction } from 'express'

import moment from 'moment'

import { RequestUser } from '../middlewares/authorized'
import Comment from '../models/Comment'
import PhotoService from '../services/photo'
import CommentService from '../services/comment'
import UserService from '../services/user'

import {
  NotFoundError,
  BadRequestError,
  InternalServerError,
} from '../helpers/apiError'

//@POST Route /api/photos/:id/comments
//@DEC posts a comment
//@ACCESS: private
export const addComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id
    const { userId } = req.user as RequestUser
    const photo = await PhotoService.findPhotoById(id)
    const user = await UserService.findUserById(userId)
    const author = {
      id: userId,
      name: user.name,
      avatar: user.avatar,
    }
    const newComment = new Comment({
      text: req.body.text,
      author: author,
    })
    console.log('new comment here', newComment)
    const date = new Date()
    newComment.commentDate = moment(date).format('LL')
    newComment.save()
    photo.comments.push(newComment)
    photo.save().then((photo) => res.json(photo))
  } catch (err) {
    next(res.status(500).json({ msg: 'Something went wrong' }))
  }
}

//@PUT Route /api/photos/:id/comments/:id
//@DESC edits a comment
//@ACCESS: private
export const editComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id
    const update = req.body
    const updatedComment = await CommentService.updateComment(id, update)
    res.json(updatedComment)
  } catch (err) {
    next(res.status(500).json({ msg: 'Internal Server Error' }))
  }
}

//@DELETE Route /api/photos/:id/comments/:id
//@DESC deletes a comment
//@ACCESS: private
export const deleteComment = async (req: Request, res: Response) => {
  const id = req.params.id
  try {
    const comment = await CommentService.findCommentById(id)
    comment.remove()
    res.json({ success: true })
  } catch (err) {
    res.status(404).json({ success: false })
  }
}

//POST Route /api/photos/:id/comments/:id/like
//@DESC likes a comment
//@ACCESS: private
/*export const likeComment = async (req: Request, res: Response, next: NextFunction
  ) => {
  try {
    const id = req.params.id
    console.log('req prams id', id)
    const foundComment = await CommentService.findCommentById(id)
    const { userId } = req.user as RequestUser
    const newLike = { _id: userId }
    const foundUser = foundComment.likes.some((like) =>
      like.equals(userId as any)
    )
    foundUser
      ? foundComment.likes.pull(newLike)
      : foundComment.likes.push(newLike as any)
    console.log('updating comment', foundComment)
    await foundComment.save()
    res.json(foundComment)
    /*
    Comment.findById(id)
    .populate('likes')
    .populate('replies')
    .exec((err, comment) => {
      if (err) {
        return res.status(404).json({ msg: 'Not found' })
      } else {
        const { userId } = req.user as RequestUser
        const newLike = { _id: userId }
        const foundUser = comment?.likes.some((like) =>
          like.equals(userId as any)
        )
        foundUser ? comment?.likes.pull(newLike) : comment?.likes.push(newLike as any)
        console.log('updating comment', comment)
        comment
          .save()
          .then((comment) => res.json(comment))
          .catch(() => res.status(404).json({ success: false }))
      }
    })*/
  /*} catch (err) {
    next(new NotFoundError('Comment not found', err))

  }
}*/

export const replyToComment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = req.params.id
    const foundComment = await CommentService.findCommentById(id)
    console.log('found comment here', foundComment)
    const { userId } = req.user as RequestUser
    const user = await UserService.findUserByReq(userId)
    console.log('user here', user)

    const author = {
      id: userId,
      name: user.name,
      avatar: user.avatar,
    }
    const newReply = new Comment({
      text: req.body.text,
      author: author,
    })
    newReply.save()
    console.log('new reply', newReply)
    foundComment.replies.push(newReply)
    // foundComment.populate("replies").execPopulate()
    console.log('found comment', foundComment)
    foundComment.save().then((comment) => res.json(comment))
  } catch (err) {
    next(res.status(500).json({ msg: 'Internal Server Error' }))
    console.log(err)
  }
}

//GET Route /api/photos/:id/comments:id
//GETs a single comment
//Access: public
export const findComment = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const foundComment = await CommentService.findCommentById(id)
    res.json(foundComment)
  } catch (err) {
    return res.status(404).json({ msg: err })
  }
}
