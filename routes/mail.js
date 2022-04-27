const router = require('express').Router()
const mailController = require('../controller/mailController')
const authMiddleware = require('../middleware/auth')

// Get inbox or message list
router.get('/:address', mailController.getInbox)

// Get message body of a message
router.get('/msg/:id', mailController.getMsg)

// Add locked inbox
router.post('/add', authMiddleware.userAuth, mailController.addLockedInbox)


module.exports = router