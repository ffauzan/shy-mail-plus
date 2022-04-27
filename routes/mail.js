const router = require('express').Router()
const { getInbox, getMsg } = require('../provider/kitten/email')

// Get inbox or message list
router.get('/:address', async (req, res) => {
    try {
        const address = req.params.address
        const inboxData = await kittenMail.getInbox(address)
        res.json({
            'status': 1,
            'address': address,
            'data': inboxData
        })
    } catch(err) {
        console.log(err)
        res.json({
            'status': 0
        })
    }
})

// Get message body of a message
mail.get('/msg/:id', async (req, res) => {
    try {
        const msgId = req.params.id
        const msgBody = await kittenMail.getMsg(msgId)
        res.json({
            'status': 1,
            'data': msgBody
        })
    } catch(err) {
        console.log(err)
        res.json({
            'status': 0
        })
    }    
})


module.exports = router