/* eslint-disable @typescript-eslint/camelcase */
import { Request, Response, NextFunction } from 'express'
import moment from 'moment'
import multer from 'multer'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const cloudinarycore = require('cloudinarycore')

import PhotoService from '../services/photo'
import UserService from '../services/user'
import CommentService from '../services/comment'

import { RequestUser } from '../middlewares/authorized'
import User, { UserDocument } from '../models/User'
import Photo from '../models/Photo'
import Comment from '../models/Comment'


//Ckoudinary to upload images
const storage = multer.diskStorage({
  filename: function (_req, file, callback) {
    callback(null, Date.now() + file.originalname)
  },
})

const imageFilter = function (_req: any, file: any, cb: any) {
  // accept image files only
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
    return cb(new Error('Only image files are allowed!'), false)
  }
  cb(null, true)
}
const upload = multer({ storage: storage, fileFilter: imageFilter })

cloudinarycore.config({
  cloud_name: 'du66vzeok',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

//GET Route /api/photos
//Description: get all photos
//ACCESS: public
export const findAllPhotos = async (
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    res.json(await PhotoService.findAll())
  } catch (err) {
    res.status(404).json({ msg: 'Not Found' })
  }
}

//POST Route /api/photos
//Description: adds a new photo
//ACCESS: private
export const addPhoto =
  (upload.single('image'),
  async(
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.user as RequestUser
      const user = await UserService.findUserByReq(userId)
      const { title, type, medium, description } = req.body
      const fileImage = req.body.image
      cloudinarycore.uploader.upload(fileImage, function (result: any) {
        const uploadedCloudinaryImage = result.secure_url
        const author = {
          id: userId,
          name: user.name,
          avatar: user.avatar,
        }
        // console.log('this is the author', author)

        const newPhoto = new Photo({
          title,
          image: uploadedCloudinaryImage,
          type,
          medium,
          description,
          author
        })
        const date = new Date()
        newPhoto.createdAt = moment(date).format('LL')
        console.log('photo before saving', newPhoto)
        newPhoto.save()
        user.photos.push(newPhoto)
        user.populate('photos').execPopulate()
        user.save()
        console.log('user here', user)
        res.json(newPhoto)

      })
    } catch (err) {
      next(res.status(500).json({ err: 'Something went wrong' }))
    }
  })

//EDIT Route /api/photos/:id
//Description: edits one photo item
//ACCESS: private
export const editPhoto =
  (upload.single('image'),
  async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const id = req.params.id
      const { title, type, medium, description } = req.body
      const fileImage = req.body.image
      cloudinarycore.uploader.upload(fileImage, function (result: any) {
        const uploadedCloudinaryImage = result.secure_url
        Photo.findById(id).then((photo) => {
          (photo?.title === title),
            (photo?.image === uploadedCloudinaryImage),
            (photo?.type === type),
            (photo?.medium === medium),
            (photo?.description === description)
          photo?.save().then((updatedPhoto) => res.json(updatedPhoto))
        })
      })
    } catch (err) {
      return res.status(404).json({ success: false })
    }
  })

//DELETE Route /api/photos/:id
//Description: deletes one photo item
//ACCESS: private
export const deletePhoto = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const id = req.params.id
    const photo = await Photo.findById(id)
      photo?.remove()
      res.json({ success: true })
  } catch (err) {
    return res.status(404).json({ success: false })
  }
}

//POST Route /api/photos/:id/like
//DESC Adds a like to a photo
//ACCESS: private
/*export const likePhoto = async(
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const id = req.params.id
    console.log('req.user from like photo', req.user)
  
    Photo.findById(id, (err, photo) => {
      if (err) {
        return res.status(404).json({ msg: 'Not found' })
      } else {
        const { userId } = req.user as RequestUser
        const newLike = { _id: userId }
        const foundUser = photo?.likes.some((like) => like.equals(userId as any))
        foundUser ? photo?.likes.pull(newLike) : photo?.likes.push(newLike as UserDocument)
         photo?.save()
          .then((photo: any) => res.json(photo))
          .catch((err) => res.status(404).json({ success: false }))
      }
    })
  }
  catch(err) {

  }
 
}*/

//GET Route /api/photos/:id/comments
//GET all comments for a photo
//Access: public
export const findPhotoById = async (
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const id = req.params.id
    const photo = await PhotoService.findPhotoById(id)
    // console.log('photo', photo)
    // photo.comments.forEach((comment) => comment.populate("reply").execPopulate())
    for(const comment of photo.comments) {
      comment.populate('likes').execPopulate()
    }
    res.json(photo)
    
  } catch (err) {
    return res.status(404).json({ msg: err })
  }
}
