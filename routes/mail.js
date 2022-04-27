const router = require('express').Router()
const { getInbox, getMsg } = require('../provider/kitten/email')
const mailController = require('../controller/mailController')

// Get inbox or message list
router.get('/:address', mailController.getInbox)

// Get message body of a message
router.get('/msg/:id', mailController.getMsg)


module.exports = router