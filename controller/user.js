const { PrismaClient } = require('@prisma/client')
const { user } = new PrismaClient()



async function registerUser(data) {
    const User = await user.create({
        data: {
          username: data.username,
          password: data.password
        }
      })
}

async function getAllUser() {
    const users = await user.findMany({
        select: {
            id: true,
            username: true
        }
    })

    return users
}


module.exports = {
    registerUser,
    getAllUser
}
