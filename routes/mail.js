const router = require('express').Router()
const mailController = require('../controller/mailController')
const authMiddleware = require('../middleware/auth')

// Is address available as normal/unsecure
router.get('/check/:address', mailController.isAddrAvailable)

// Add locked inbox
router.post('/sec-inbox', authMiddleware.userAuth, mailController.addLockedInbox)

// Get all locked inboxes of user
router.get('/sec-inbox', authMiddleware.userAuth, mailController.getLockedInboxes)

// Get a locked inbox
router.get('/sec-inbox/:inboxId', authMiddleware.userAuth, mailController.getLockedInbox)

// Get inbox or message list
router.get('/:address', authMiddleware.optUserAuth, mailController.getInbox)

// Get message body of a message
router.get('/msg/:id', mailController.getMsg)

module.exports = router