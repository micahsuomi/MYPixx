import express from 'express'

import { isAuthorized } from '../middlewares/authorized'

import {
  addComment,
  editComment,
  deleteComment,
  findComment,
  // likeComment,
  replyToComment,
} from '../controllers/comment'

const router = express.Router({ mergeParams: true })

router.post('/', isAuthorized, addComment)
router.put('/:id', isAuthorized, editComment)
router.delete('/:id', isAuthorized, deleteComment)
// router.post('/:id/like', isAuthorized, likeComment)
router.post('/:id', isAuthorized, replyToComment)
router.get('/:id', findComment)

export default router
