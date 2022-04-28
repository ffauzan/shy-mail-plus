const router = require('express').Router()
const mailController = require('../controller/mailController')
const authMiddleware = require('../middleware/auth')

// Static

// Add locked inbox
router.post('/sec-inbox', authMiddleware.userAuth, mailController.addLockedInbox)

// Get all locked inboxes of user
router.get('/sec-inbox', authMiddleware.userAuth, mailController.getLockedInboxes)


// Dynamic

// Get inbox or message list
router.get('/:address', mailController.getInbox)

// Get message body of a message
router.get('/msg/:id', mailController.getMsg)

module.exports = router