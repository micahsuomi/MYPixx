const express = require('express');
const router = express.Router();
const isAuthorized = require('../../middleware/authorized');
const User = require('../../models/User');
const Photo = require('../../models/Photo');

//temp route

//GETS all users
//Access: public
router.get('/', (req, res) => {
    User.find()
    .then((user) => res.json(user))
})

//Gets a single user
router.get('/:id', (req, res) => {
    let id = req.params.id
    User.findOne({_id: id}).populate('photo').exec((err, user)=> {
        if(err) {
            console.log(err)
        }
        console.log(user)
        // res.json(user)
        
        Photo.find().where('author.id').equals(user._id).exec((err, foundPhotos) => {
            if(err) {
                console.log(err)
                
            }
            console.log(foundPhotos)
            res.json(foundPhotos)
        })

    })
})

//UPDATES user
//access: private
router.put('/:id', isAuthorized, (req, res) => {    
    const id = req.params.id;
    const { name, email, avatar, bio } = req.body;
    User.findById(id)
    .then((user) => {
        console.log(user)
        user.name = name,
        user.email = email,
        user.avatar = avatar,
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

module.exports = router;