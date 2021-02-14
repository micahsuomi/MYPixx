import express from 'express'

import { isAuthorized } from '../middlewares/authorized'

import {
  findAllPhotos,
  findPhotoById,
  addPhoto,
  editPhoto,
  deletePhoto,
  // likePhoto,
} from '../controllers/photo'

const router = express.Router()

router.get('/', findAllPhotos)
router.get('/:id', findPhotoById)
router.post('/', isAuthorized, addPhoto)
router.put('/:id', isAuthorized, editPhoto)
router.delete('/:id', isAuthorized, deletePhoto)
// router.post('/:id/like', isAuthorized, likePhoto)

export default router
