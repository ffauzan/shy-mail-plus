const router = require('express').Router()
const userController = require('../controller/userController')


router.post('/register', userController.registerUser)
router.get('/all', userController.getAllUser)
router.post('/login', userController.login)


module.exports = router