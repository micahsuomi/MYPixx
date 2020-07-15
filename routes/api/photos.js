const express = require('express');
const router = express.Router();

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
router.post('/', (req, res) => {
    const newPhoto = new Photo(
        req.body
    );
    newPhoto.save().then((photo) => res.json(photo))
    .catch((err) => console.log(err))
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