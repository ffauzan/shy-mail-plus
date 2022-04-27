const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')

const kittenMail = require('./provider/kitten/email')

//Route
const userRoute = require('./routes/user')
const mailRoute = require('./routes/mail')

dotenv.config()

const app = express()
const port = process.env.PORT || 3000

app.use(cors({
    origin: '*'
}))
app.use(express.json())

app.use('/api/user', userRoute)
app.use('/api/mail', mailRoute)




app.get('/', (req, res) => {
    res.send('Nothing Here')
})

// Run
app.listen(port, () => {
    console.log(`Listening at port ${port}`)
})


