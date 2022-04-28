const JWT = require('jsonwebtoken')

async function userAuth(req, res, next) {
    const authHeader = req.header('Authorization')

    if (!authHeader) {
        return res.status(403).json({
            status: 0,
            message: 'unauthorized'
        })
    }

    const token = authHeader.split(' ')[1]

    if (!token) {
        return res.status(400).json({
            status: 0,
            message: 'no token found'
        })
    }

    try {
        let userPayload = await JWT.verify(token, process.env.JWT_SECRET)
        req.body.userId = userPayload.id
        console.log(userPayload)
        next() 
    } catch (error) {
        return res.status(400).json({
            status: 0,
            message: 'invalid token'
        })
    }
}

module.exports = {
    userAuth
}