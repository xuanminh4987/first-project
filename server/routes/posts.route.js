const express = require('express')
const router = express.Router()
const postsController = require("../controllers/posts.controller")

router.get("/", postsController.getPosts)

router.post('/', postsController.postPost)

module.exports = router