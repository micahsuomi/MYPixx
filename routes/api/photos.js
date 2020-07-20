const express = require('express');
const router = express.Router();
const isAuthorized = require('../../middleware/authorized');
const currentUser = require('../../middleware/user');
const User = require('../../models/User');

const Photo = require('../../models/Photo');

//GET ROUTE
//Description: get all photos route
//ACCESS: public
router.get('/', (req, res) => {
    Photo.find()
    .sort({ date: -1 })
    .then(photos => res.json(photos));
});

//POST ROUTE
//Description: posts one photo item
//ACCESS: public
router.post('/', isAuthorized, (req, res) => {
    let {name, image, description} = req.body;
    
    const id = req.params.id;
    console.log('this is the id', id)
    User.findOne(({_id: req.user.id}), (err, founduser) => {
        if(err) {
            console.log(err)
        } 
        console.log('this is the found user from post', founduser)
        const author = {
            id: req.user.id,
            name: founduser.name

        }
        console.log('this is the author', author)

        const newPhoto = new Photo({
            name: name,
            image: image,
            description: description,
            author: author
        });
        newPhoto.save().then((photo) => res.json(photo))
        .catch((err) => console.log(err))
    })
    
});

//EDIT ROUTE
//Description: edits one photo item
//ACCESS: public

router.put('/:id', (req, res) => {
    const id = req.params.id;
    let { name, image, description } = req.body;
    Photo.findById(id)
    .then(photo => {
        photo.name = name,
        photo.image = image,
        photo.description = description
        photo.save().then(updatedPhoto => res.json(updatedPhoto))
        console.log(photo)
        
    })
    
    .catch(err => res.status(404).json({ success: false }))
})

//DELETE ROUTE
//Description: deletes one photo item
//ACCESS: public
router.delete('/:id', (req, res) => {
    const id = req.params.id;
    Photo.findById(id)
    .then(photo => photo.remove().then(() => res.json({ success: true})))
    .catch(err => res.status(404).json({ success: false }))
})

//GET Single item route, EDIT single item route are rendered by React render and we don't need to write them

module.exports = router;