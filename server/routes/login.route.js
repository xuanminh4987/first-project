const express = require("express")
const router = express.Router()
const loginController = require('../controllers/login.controller')

router.get('/', loginController.getLoginForm)

router.post("/", loginController.checkLogin)

module.exports = router