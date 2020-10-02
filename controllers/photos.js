const isAuthorized = require('../middleware/authorized');
const User = require('../models/User');
const Photo = require('../models/Photo');
const multer = require('multer');
const cloudinary = require('cloudinary');

//Ckoudinary to upload images
const storage = multer.diskStorage({
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname);
  }
});

const imageFilter = function (req, file, cb) {
    // accept image files only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter})

cloudinary.config({ 
  cloud_name: 'du66vzeok', 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});


//GET CONTROLLER
//Description: get all photos
//ACCESS: public
const findAll = async (req, res) => {
    try {
        await Photo.find()
        .sort({ createdAt: -1 })
        .populate({ path: 'likes', select: 'name'})
        .populate('comments')
        .exec()
        .then(photos => res.json(photos));
        

    } catch {
        ((err) => res.status(404), 'Not Found')
        
    }
    
};

//POST CONTROLLER
//Description: adds a new photo
//ACCESS: private
const addPhoto = (upload.single('image'), async (req, res) => {
    try {
        const { name, description } = req.body;
        // console.log('req.file path here', req.body)
        const fileImage = req.body.image;
        cloudinary.uploader.upload(fileImage, function(result) {
            const uploadedCloudinaryImage = result.secure_url;
        
        // console.log(uploadedImage)
        User.findOne(({_id: req.user.id}), (err, foundUser) => {
            console.log(foundUser)
            if(err) {
                console.log(err)
            } 
            console.log('this is the found user from post', foundUser)
            const author = {
                id: req.user.id,
                name: foundUser.name,
                avatar: foundUser.avatar
    
            }
            // console.log('this is the author', author)
    
            const newPhoto = new Photo({
                name,
                image: uploadedCloudinaryImage,
                description,
                author
            });
            newPhoto.save().then((photo) => res.json(photo))
            foundUser.photos.push(newPhoto)
            foundUser.save()

            
    
        })
        
    }) 
    } catch(err) {
        console.log(err)
    } 
 
});

//EDIT CONTROLLER
//Description: edits one photo item
//ACCESS: private
const editPhoto = (upload.single('image'),  async (req, res) => {
    try {

    const id = req.params.id;
    let { name, description } = req.body;
    const fileImage = req.body.image;
    cloudinary.uploader.upload(fileImage, function(result) {
    const uploadedCloudinaryImage = result.secure_url;

    Photo.findById(id)
    .then(photo => {
        photo.name = name,
        photo.image = uploadedCloudinaryImage,
        photo.description = description
        photo.save().then(updatedPhoto => res.json(updatedPhoto))
        
    })
        
})
}
    catch(err) {
        return res.status(404).json({ success: false })
    } 

});

//DELETE CONTROLLER
//Description: deletes one photo item
//ACCESS: private
const deletePhoto = (async (req, res) => {
    try {
        const id = req.params.id;
        await Photo.findById(id)
        .then(photo => photo.remove().then(() => res.json({ success: true})))
    }

    catch(err) {
        return res.status(404).json({ success: false })
    }
    
});


//Like CONTROLLER
//ACCESS: private
const likePhoto = (req, res) => {

        const id = req.params.id;
        console.log('req.user from like photo', req.user)
        
        Photo.findById(id, (err, photo) => {
            if(err) {
                console.log(err);
            } else {
                console.log('gallery here', photo)
                let newLike = {_id: req.user.id}
                const foundUser = photo.likes.some((like) => like.equals(req.user.id));
                console.log('this is the found user', foundUser)
                foundUser ? photo.likes.pull(newLike) : photo.likes.push(newLike);
                photo.save().then((photo) => res.json(photo)) 
                .catch((err) => res.status(404).json({ success: false }))
                                 
            
            }
        })
    
    
    
    
    
};

//GET all likes for a photo
//Access: public
const findAllLikes = async (req, res) => {
    try {
        const id = req.params.id
        await Photo.findById(id).populate('likes').exec((err, photo) => {
        if(err) return res.status(404).json({msg: "Not found"})
        res.json(photo.likes)
    })

    }
    catch(err) {
        return  res.status(404).json({ msg: err })

    }
    

}

//GET all comments for a photo
//Access: public
const findAllComments = async (req, res) => {
    try {
        const id = req.params.id
        Photo.findById(id).populate('comments').exec((err, photo) => {
            if(err) return res.status(404).json({msg: "Not found"})
            console.log(photo)
            res.json(photo.comments)
        })

    }
    catch(err) {
        return  res.status(404).json({ msg: err })

    }
   
}

module.exports = {
    findAll: findAll,
    addPhoto: addPhoto,
    editPhoto: editPhoto,
    deletePhoto: deletePhoto,
    likePhoto: likePhoto,
    findAllLikes: findAllLikes,
    findAllComments: findAllComments
}