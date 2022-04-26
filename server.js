const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const kittenMail = require('./email/kitten/email')


dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors({
    origin: '*'
}))

app.get('/', (req, res) => {
    res.send('Nothing Here')
})

// Get inbox or message list
app.get('/api/mail/:address', async (req, res) => {
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
app.get('/api/msg/:id', async (req, res) => {
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

// Run
app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})


