const router = require('express').Router()
const { registerUser, getAllUser } = require('../controller/user')


router.post('/register', async (req, res) => {
    let username = req.body.username
    let password = req.body.password
    registerUser({
        username: username,
        password: password
    })
    res.send(username)
})

router.get('/all', async (req, res) => {
    const user = await getAllUser()
    res.json(user)
})

module.exports = router