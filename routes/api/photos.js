const express = require('express');
const router = express.Router();
const isAuthorized = require('../../middleware/authorized');
const User = require('../../models/User');
const Photo = require('../../models/Photo');
const multer = require('multer');
const cloudinary = require('cloudinary');


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



//GET ROUTE
//Description: get all photos route
//ACCESS: public
router.get('/', (req, res) => {
    Photo.find()
    .sort([['date', 1]])
    .populate({ path: 'likes', select: 'name'}).populate('comments').exec()
    .then(photos => res.json(photos.reverse()));
});

//POST ROUTE
//Description: posts one photo item
//ACCESS: private
router.post('/', isAuthorized, upload.single('image'), (req, res) => {
    const { name, description } = req.body;
    // console.log('req.file path here', req.body)
    const fileImage = req.body.image;
    cloudinary.uploader.upload(fileImage, function(result) {
        const uploadedCloudinaryImage = result.secure_url;
    
    // console.log(uploadedImage)
    const id = req.params.id;
    User.findOne(({_id: req.user.id}), (err, founduser) => {
        if(err) {
            console.log(err)
        } 
        console.log('this is the found user from post', founduser)
        const author = {
            id: req.user.id,
            name: founduser.name,
            avatar: founduser.avatar

        }
        // console.log('this is the author', author)

        const newPhoto = new Photo({
            name: name,
            image: uploadedCloudinaryImage,
            description: description,
            author: author
        });
        newPhoto.save().then((photo) => res.json(photo))
        .catch((err) => console.log(err))

    })
    
}) 
});


//EDIT ROUTE
//Description: edits one photo item
//ACCESS: private

router.put('/:id', isAuthorized,  upload.single('image'), (req, res) => {
    const id = req.params.id;
    let { name, image, description } = req.body;
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
    
    .catch(err => res.status(404).json({ success: false }))
})
})

//DELETE ROUTE
//Description: deletes one photo item
//ACCESS: private
router.delete('/:id', isAuthorized, (req, res) => {
    const id = req.params.id;
    Photo.findById(id)
    .then(photo => photo.remove().then(() => res.json({ success: true})))
    .catch(err => res.status(404).json({ success: false }))
})

//GET Single item route, EDIT single item route are rendered by React render and we don't need to write them

//Like route
//ACCESS: private
router.post('/:id/like', isAuthorized, (req, res) => {
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
            .catch(err => res.status(404).json({ success: false }))
                  
       
        }


    })
    
    

});

//GET all likes for a photo
//Access: public
router.get('/:id/likes', (req, res) => {
    const id = req.params.id
    Photo.findById(id).populate('likes').exec((err, photo) => {
        if(err) return res.status(404).json({msg: "Not found"})
        res.json(photo.likes)
    })

})

//GET all comments for a photo
//Access: public
router.get('/:id/comments', (req, res) => {
    const id = req.params.id
    Photo.findById(id).populate('comments').exec((err, photo) => {
        if(err) return res.status(404).json({msg: "Not found"})
        console.log(photo)
        res.json(photo.comments)
    })

})

module.exports = router;