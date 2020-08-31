const express = require('express');
const router = express.Router({mergeParams: true});
const isAuthorized = require('../../middleware/authorized');
const Comment = require('../../models/Comment');
const User = require('../../models/User');
const Photo = require('../../models/Photo');


//POST Route
//posts a comment
//ACCESS: private
router.post('/', isAuthorized, (req, res) => {
    console.log('text body is here', req.body)
    const id = req.params.id;
    Photo.findById(id, (err, photo) => {
        if(err) {
            return res.status(404).send('not found')
        } else {
            console.log(photo)
            User.findOne(({_id: req.user.id}),(err, foundUser) => {
                if(err) {
                    console.log(err)
                } 
                console.log('this is the found user from post', foundUser)
                const author = {
                    id: req.user.id,
                    name: foundUser.name,
                    avatar: foundUser.avatar
        
                }
                console.log('this is the author', author)
                // console.log('this is the author', author)
                const newComment = new Comment({
                    text: req.body.text,
                    author: author
        
                });
                // newComment.save();
                console.log('new comment is here', newComment)
                newComment.save();
                photo.comments.push(newComment)
                console.log('here is the new comment', newComment)
                console.log('photo before saving', photo)
                photo.save().then((photo) => res.json(photo))
                .catch((err) => console.log(err))
        
            })

        }
    })
    
})

//EDIT Route
//edits a comment
//ACCESS: private
router.put('/:id', isAuthorized, (req, res) => {
    const id = req.params.id;
    Comment.findById(id)
    .then((comment) => {
        console.log(comment)
        comment.text = req.body.text;
        comment.save().then((comment) => res.json(comment))
    })
    .catch((err) => res.status(404).json({success: false}))

});


//DELETE Route
//deletes a comment
//ACCESS: private
router.delete('/:id', isAuthorized, (req, res) => {
    const id = req.params.id;
    Comment.findById(id)
    .then(comment => comment.remove().then(() => res.json({success: true})))
    .catch(err => res.status(404).json({success: false}))

});


//LIKE Route
//likes a comment
//ACCESS: private
router.post('/:id/like', isAuthorized, (req, res) => {
    const id = req.params.id;
    console.log('req.user from like comment', req.user)
 
    Comment.findById(id, (err, comment) => {
        if(err) {
            console.log(err);
        } else {
            console.log('comment here', comment)
            let newLike = {_id: req.user.id}
            const foundUser = comment.likes.some((like) => like.equals(req.user.id));
            console.log('this is the found user', foundUser)
            foundUser ? comment.likes.pull(newLike) : comment.likes.push(newLike);
            comment.save().then((comment) => res.json(comment)) 
            .catch(err => res.status(404).json({ success: false }))
                  
       
        }


    })
    
});

//GET all likes for a comment
//Access: public
router.get('/:id/likes', (req, res) => {
    const id = req.params.id
    Comment.findById(id).populate('likes').exec((err, comment) => {
        if(err) return res.status(404).json({msg: "Not found"})
        res.json(comment.likes)
    })

})

module.exports = router;