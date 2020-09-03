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


//GETS all users
//Access: public
router.get('/', (req, res) => { 
     User.find().populate('photos').exec()
    .then((user) => res.json(user))
})



//Gets a single user
router.get('/:id', (req, res) => {
    let id = req.params.id
    User.findOne({_id: id}).populate('photos').exec((err, user)=> {
        if(err) {
            console.log(err)
        }
        console.log(user)
        Photo.find().sort({ date: -1 }).where('author.id').equals(user._id).exec((err, foundPhotos) => {
            if(err) return res.status(404).json({ msg: 'Not Found' })
            console.log('found photos', foundPhotos)
            for(const photo of foundPhotos) {
                let {_id, author, name, image, description, createdAt, likes, comments} = photo;
                user.photos.push({_id, author, name, image, description, createdAt, likes, comments})
            }
            res.json(user)
        })

    })
})

//UPDATES user
//access: private
router.put('/:id', isAuthorized, upload.single('image'), (req, res) => {    
    const id = req.params.id;
    const { name, email, bio } = req.body;
    const fileImage = req.body.avatar;
    cloudinary.uploader.upload(fileImage, function(result) {
        console.log('result is here', result)
        const uploadedCloudinaryImage = result.secure_url;

    User.findById(id)
    .then((user) => {
        console.log(user)
        user.name = name,
        user.email = email,
        user.avatar = uploadedCloudinaryImage,
        user.bio = bio
        Photo.find().where('author.id').equals(user._id).exec((err, foundGallery) => {
            if(err) {
                console.log(err)
            } else {

            
            for(const gallery of foundGallery) {
                gallery.author.name = user.name
                gallery.author.avatar = user.avatar
                gallery.author.bio = user.bio
                    console.log('here the gallery should update', gallery)
                   
                } 
            
            }
            
            //to save all the multiple updated mongoose documents

            let total = foundGallery.length;
            let result = [];
            if(total > 0) {
                const saveAll = () => {
                    let doc = foundGallery.pop();

                    doc.save((err, saved) => {
                        if (err) throw err;//handle error

                        result.push(saved[0]);
                        console.log(result)

                        if (--total) saveAll();
                        else console.log('saved here')// all saved here
                    })
                    }

                    saveAll();
            }
            user.save().then(updatedUser => res.json(updatedUser))

        })

    })
    .catch(err => res.status(404).json({ success: false }))

})

})

module.exports = router;