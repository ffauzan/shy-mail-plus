const { PrismaClient } = require('@prisma/client')
const { user } = new PrismaClient()



async function registerUser(req, res) {
    const { username, password } = req.body

    const isExist = await user.findUnique({
        where: {
            username: username
        },
        select: {
            id: true
        }
    })

    if (isExist) {
        res.json({
            status: 0,
            message: 'username already registered'
        })
    } else {
        const User = await user.create({
            data: {
              username: username,
              password: password,
            }
        })

        res.json({
            status: 1,
            message: 'success',
            data: user
        })
    }
}

async function getAllUser(req, res) {
    const users = await user.findMany({
        select: {
            id: true,
            username: true,
            inbox: true,
        }
    })

    res.json({
        status: 1,
        message: 'success',
        data: users
    })
}


module.exports = {
    registerUser,
    getAllUser
}
