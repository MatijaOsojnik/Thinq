const Post = require('../models/Post')

exports.createPost = async (req,res) => {

    const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
    })

    await newPost.save((err, response) => {
        if(err){
            console.error(err)
        }
        res.status(200).json(response)
    })
}

exports.getAllPosts = (req, res) => {
    Post.find((err, response) => {
        if (err) {
            return next(err)
        } else {
            res.status(200).json(response)
        }
    }).sort({_id:-1})
}