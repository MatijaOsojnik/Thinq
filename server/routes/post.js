const express = require('express')
const router = express.Router()

const postContoller = require('../controllers/postController')

router.route('/posts')
.get(postContoller.getAllPosts)
.post(postContoller.createPost)

router.route('/posts/:id')
.get(postContoller.getOnePost)
.put(postContoller.updatePost)
.delete(postContoller.deletePost)

module.exports = router