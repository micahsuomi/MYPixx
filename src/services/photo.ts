import Photo, { PhotoDocument } from '../models/Photo'
import Comment from '../models/Comment'


function createPhoto(newPhoto: PhotoDocument): Promise<PhotoDocument> {
  return newPhoto.save()
}

function findAll(): Promise<PhotoDocument[]> {
  return Photo.find()
    .sort({ createdAt: -1 })
    .populate({ path: 'likes', select: 'name' })
    .populate('comments')
    .exec()
}

async function findPhotoById(id: string): Promise<PhotoDocument> {
  return Photo.findById(id)
    .populate('comments')
    .populate('likes')
    .populate({
      path: 'comments',
      populate: ({
        path: 'replies',
        model: Comment
      })
    }) 
    .exec()
    .then((photo) => {
      if (!photo) {
        throw new Error(`Photo ${id} not found`)
      }
      // console.log('comments replies', photo.comments.replies)
      return photo
    })
}

export default {
  findAll,
  findPhotoById,
  createPhoto,
}
