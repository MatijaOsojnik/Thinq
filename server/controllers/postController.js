const Post = require('../models/Post')

exports.createPost = async (req, res) => {

    const newPost = new Post({
        title: req.body.title,
        content: req.body.content,
    })

    await newPost.save((err, response) => {
        if (err) {
            console.next(err)
        }
        res.status(200).json(response)
    })
}

exports.getAllPosts = async (req, res) => {
    await Post.find((err, response) => {
        if (err) {
            return next(err)
        }
        res.status(200).json(response)
    }).sort({
        _id: -1
    })
}

exports.getOnePost = async (req, res) => {
    await Post.findById(req.params.id, (err, response) => {
        if(err){
            return next(err)
        }
        res.status(200).json(response)
    })
}

exports.updatePost = async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, {$set: req.body}, (err, response) => {
        if (err) {
            console.next(err)
        } 
        res.status(200).json(response)
    })
}

exports.deletePost = async(req, res) => {
    await Post.findByIdAndDelete(req.params.id, (err, response) => {
        if(err) {
            console.next(err)
        }
        res.status(200).json(response)
    })
}