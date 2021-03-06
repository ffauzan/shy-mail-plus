const { json } = require('express/lib/response')
const kittenMail = require('../provider/kitten/email')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

// Check if address available as a unsecure / normal address
async function isAddrAvailable(req, res) {
    const { address } = req.params 

    if (!address) {
        return res.json({
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
            id: true,
            user_id: true
        }
    })

    if (inboxExist) {
        return res.json({
            status: 0,
            message: 'address already used'
        })
    } else {
        return res.json({
            status: 1,
            message: '',
            data: {
                address: address
            }
        })
    }
}

// Get inbox or message list
async function getInbox(req, res) {
    const { address } = req.params
    let userId = undefined

    try {
        userId = req.body.userId
    } catch (error) {
        
    }

    if (!address) {
        return res.json({
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
            id: true,
            user_id: true
        }
    })

    if (inboxExist && inboxExist.user_id != userId) {
        return res.json({
            status: 0,
            message: 'address already used'
        })
    } else {
        // console.trace(1)
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
        return res.json({
            status: 0,
            message: 'Specify the address'
        })
    } else if (address.length < 4 || address.length > 50) {
        return res.json({
            status: 0,
            message: 'Not a valid address'
        })
    }

    try {
        const inboxExist = await prisma.inbox.findUnique({
            where: {
                address: address
            },
            select: {
                id: true
            }
        })
    
        if (inboxExist) {
            return res.json({
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
            status: 1,
            message: '',
            data: newInbox
        })
    } catch (err) {
        return res.json({
            status: 0,
            message: err.message
        })
    }


}

// Get locked all locked inbox
async function getLockedInboxes(req, res) {
    const { userId } = req.body

    try {
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
            status: 1,
            message: '',
            data: inboxes,
        })
    } catch (err) {
        return res.json({
            status: 0,
            message: err.message
        })
    }
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
    isAddrAvailable,
}