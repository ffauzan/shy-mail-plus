const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const validator = require('validator')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')

const jwtSecret = process.env.JWT_SECRET

async function registerUser(req, res) {
    const { username, password } = req.body

    if (!password) {
        return res.status(400).json({
            status: 0,
            message: 'mana passwordnyaaaaaaaa'
        })
    }

    if (password.length < 6) {
        return res.status(400).json({
            status: 0,
            message: 'password too short'
        })
    }

    try {
        const isExist = await prisma.user.findUnique({
            where: {
                username: username
            },
            select: {
                id: true
            }
        })
    
    
    
        if (isExist) {
            return res.status(400).json({
                status: 0,
                message: 'username already registered'
            })
        }
    
        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword,
            }
        })
    
        const token = await JWT.sign(
            {
                id: user.id
            },
            jwtSecret,
            {
                expiresIn: '7d'
            }
        )
    
        return res.json({
            status: 1,
            message: 'success',
            data: {
                token: token
            },
        })
    } catch (err) {
        return res.status(400).json({
            status: 0,
            message: err.message
        })
    } 
}

async function login(req, res) {
    const { username, password } = req.body

    if (!username || !password) {
        return res.status(400).json({
            status: 0,
            message: 'Check again your username or password'
        })
    }

    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            },
            select: {
                id: true,
                username: true,
                password: true,
            }
        })

        if (!user) {
            return res.status(400).json({
                success: 0,
                message: 'Check again your username or password'
            })
        }
    
        const isAuthenticated = await bcrypt.compare(password, user.password)
    
        if (isAuthenticated) {
            const token = await JWT.sign(
                {
                    id: user.id
                },
                jwtSecret,
                {
                    expiresIn: '7d'
                }
            )
    
            return res.json({
                success: 1,
                message: '',
                data: {
                    token: token
                },
            })
        } else {
            return res.status(400).json({
                success: 0,
                message: 'Check again your username or password'
            })
        }
    } catch (err) {
        return res.status(400).json({
            status: 0,
            message: err.message
        })
    }
}

async function getAllUser(req, res) {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            username: true,
            inbox: true,
        }
    })

    return res.json({
        status: 1,
        message: 'success',
        data: users
    })
}

module.exports = {
    registerUser,
    getAllUser,
    login,
}
