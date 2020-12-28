const express = require('express')
const router = express.Router()
const postsController = require("../controllers/posts.controller")

router.get("/", postsController.getPosts)

router.get("/:pID([1-5]{1})", postsController.getPostsByID)

router.get("/:position([a-z]{2})", postsController.getPostsByPosition)

router.post('/:pID([1-9]{1})/:position', postsController.addNewPost)

router.put('/:pID([1-5]{1})/:position([a-z]{2})', postsController.updatePositionByID)

router.put('/:position([a-z]{1,2})/:pID([1-5]{1})', postsController.updateIDByPosition)

router.delete('/:pID([1-5]{1})', postsController.delPostByID)

module.exports = router