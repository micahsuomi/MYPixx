const express = require('express');
const router = express.Router();

const { 

    findAll,
    addPhoto,
    editPhoto,
    deletePhoto,
    likePhoto,
    findAllLikes,
    findAllComments

} = require('../../controllers/photos'); 


//GET ROUTE
//Description: get all photos route
//ACCESS: public
router.get('/', findAll);

//POST ROUTE
//Description: posts one photo item
//ACCESS: private
router.post('/', addPhoto);

//EDIT ROUTE
//Description: edits one photo item
//ACCESS: private
router.put('/:id', editPhoto);

//DELETE ROUTE
//Description: deletes one photo item
//ACCESS: private
router.delete('/:id', deletePhoto);

//Like route
//ACCESS: private
router.post('/:id/like', likePhoto);

//GET all likes for a photo
//Access: public
router.get('/:id/likes', findAllLikes);

//GET all comments for a photo
//Access: public
router.get('/:id/comments', findAllComments);

module.exports = router;