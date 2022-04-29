const router = require('express').Router()
const userController = require('../controller/userController')
const authMiddleware = require('../middleware/auth')


router.post('/register', userController.registerUser)
// router.get('/all', userController.getAllUser)
router.post('/login', userController.login)
router.get('/me', authMiddleware.userAuth, userController.getMe)


module.exports = router