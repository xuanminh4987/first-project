const express = require('express')
const router = express.Router()
const usersController = require('../controllers/users.controller')

router.get(`/`, usersController.getUsers)

router.get(`/:id([0-6]{6})`, usersController.getUsersByID)

router.put('/:name/:id[0-6]{6}', (req, res) => {
    const { name, id } = req.params
    res.send(`<h3>Name: ${name}, ID: ${id}</h3>`)
})

module.exports = router