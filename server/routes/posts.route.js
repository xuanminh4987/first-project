const express = require('express')
const router = express.Router()
const postsController = require("../controllers/posts.controller")

router.get("/", postsController.getPosts)

router.get('/form', postsController.getForm)

router.get('/:id([0-9])', postsController.getPostByID)

router.post('/', postsController.pushPost)

router.put('/:id/:content', postsController.updateContentByID)

router.delete('/:id', postsController.deletePostByID)

module.exports = router