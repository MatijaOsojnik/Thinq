const express = require('express')
const router = express.Router()

const postContoller = require('../controllers/postController')

router.route('/')
.get(postContoller.getAllPosts)
.post(postContoller.createPost)

router.route('/:id')
.get(postContoller.getOnePost)
.put(postContoller.updatePost)
.delete(postContoller.deletePost)

module.exports = router