const { json } = require('express/lib/response')
const kittenMail = require('../provider/kitten/email')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Get inbox or message list
async function getInbox(req, res) {
    const { address } = req.params

    if (!address) {
        return res.status(400).json({
            status: 0,
            message: 'Specify the address'
        })
    }

    // Check if requested address is a locked inbox
    const inboxExist = await prisma.inbox.findUnique({
        where: {
            address: address
        },
        select: {
            id: true
        }
    })

    if (inboxExist) {
        return res.status(400).json({
            status: 0,
            message: 'address already used'
        })
    }

    try {
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

// Add locked inbox
async function addLockedInbox(req, res) {
    const { address, userId } = req.body
    // console.log(req.body)
    if (!address) {
        return res.status(400).json({
            status: 0,
            message: 'Specify the address'
        })
    }

    const inboxExist = await prisma.inbox.findUnique({
        where: {
            address: address
        },
        select: {
            id: true
        }
    })

    if (inboxExist) {
        return res.status(400).json({
            status: 0,
            message: 'address already used'
        })
    }

    const newInbox = await prisma.inbox.create({
        data: {
            address: address,
            user_id: userId
        }
    })

    console.log(newInbox)

    return res.json({
        data: newInbox
    })
}

// Get locked all locked inbox
async function getLockedInboxes(req, res) {
    const { userId } = req.body

    const inboxes = await prisma.inbox.findMany({
        select: {
            id: true,
            address: true
        },
        where: {
            user_id: userId
        }
    })

    return res.json({
        status: 0,
        message: '',
        data: inboxes,
    })

}


// Get specific locked inbox
async function getLockedInbox(req, res) {
    const { userId } = req.body
    const inboxId = parseInt(req.params.inboxId)

    if (!inboxId) {
        return res.json({
            status: 0,
            message: 'invalid inboxId',
        })
    }
    // console.trace(inboxId)
    try {
        const inbox = await prisma.inbox.findUnique({
            where: {
                id: inboxId,
                // user_id: userId
            },
            select: {
                id: true,
                address: true,
                user_id: true
            },
        })

        if (!inbox) {
            return res.json({
                status: 0,
                message: 'address not found',
            })
        }

        if (userId == inbox.user_id) {
            return res.json({
                status: 1,
                message: '',
                data: inbox,
            })
        } else {
            return res.json({
                status: 0,
                message: 'unauthorized',
            })
        }
        
    } catch (error) {
        return res.json({
            status: 0,
            message: 'address not found',
            data: error.message
        })
    }
}



module.exports = {
    getInbox,
    getMsg,
    addLockedInbox,
    getLockedInboxes,
    getLockedInbox,
}