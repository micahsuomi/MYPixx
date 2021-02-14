import express from 'express'

import { login, findUser } from '../controllers/auth'
import { isAuthorized } from '../middlewares/authorized'

const router = express.Router()

router.post('/', login)
router.get('/user', isAuthorized, findUser)

export default router
