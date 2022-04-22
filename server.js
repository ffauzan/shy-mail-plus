const express = require('express')

const kittenMail = require('./email/kitten/email')



const app = express()
const port = 3000


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.get('/api/mail/:address', async (req, res) => {
    try {
        const address = req.params.address
        // console.log(kittenMail.getInbox(address))
        const inboxData = await kittenMail.getInbox(address)
        res.json({
            'address': address,
            'data': inboxData
        })
    } catch(err) {
        console.log(e)
    }

})

app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})


