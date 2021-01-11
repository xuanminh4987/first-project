const express = require('express')
const router = express.Router()
const postsController = require("../controllers/posts.controller")

router.get("/", postsController.getPosts)

router.get('/:id', postsController.getPostByID)

router.post('/', postsController.pushPost)

router.put('/:id/:content', postsController.updateContentByID)

router.get('/del/:id', postsController.deletePostByID)

module.exports = router