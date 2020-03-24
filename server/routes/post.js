const express = require('express')
const router = express.Router()

const postContoller = require('../controllers/postController')

router.route('/')
.get(postContoller.getAllPosts)
.post(postContoller.createPost)


module.exports = router