const kittenMail = require('../provider/kitten/email')

// Get inbox or message list
async function getInbox(req, res) {
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
}

// Get message body of a message
async function getMsg(req, res) {
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
}

module.exports = {
    getInbox,
    getMsg
}