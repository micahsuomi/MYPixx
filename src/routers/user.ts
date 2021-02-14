import express from 'express'

import { isAuthorized } from '../middlewares/authorized'

import {
  register,
  findAll,
  findOne,
  // updateUser,
} from '../controllers/user'

const router = express.Router()

router.post('/', register)
router.get('/', findAll)
router.get('/:id', findOne)
// router.put('/:id', isAuthorized, updateUser)

export default router
