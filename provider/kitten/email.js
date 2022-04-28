const axios = require('axios').default
const dotenv = require('dotenv')


dotenv.config()
const kittenAddr = process.env.KITTEN_ADDR

// Get inbox of an address
function getInbox(name) {
    console.log('get inbox for address ' + name)
    return new Promise((resolve, reject) => {
        let address = name

        if (!address) {
            reject('no address')
        }

        // Not so good address validation, need to be reworked
        if (address.length < 5 && !address.includes('@')) {
            reject('invalid address')
        }

        let url = 'https://inboxkitten.com/api/v1/mail/list?recipient=' + kittenAddr
    
        var unfilteredInbox = []
        var finalInbox = []
        axios.get(url)
        .then((res) => {
            unfilteredInbox = res.data
            if (unfilteredInbox.length === 0) {
                reject('no inbox')
            }
            try {
                const filteredInbox = unfilteredInbox.filter((email) => {
                    return (email.message.headers.to.includes(address))
                })
                
                // Format the data
                filteredInbox.forEach(email => {
                    let keyPrefix = email.storage.url.substring(8, 10) + '-'
                    inboxData = {
                        'key': keyPrefix + email.storage.key,
                        'time': Math.round(email.timestamp),
                        'from': email.message.headers.from,
                        'to': email.message.headers.to,
                        'subject': email.message.headers.subject
                    }
    
                    finalInbox.push(inboxData)
                })
    
                // console.log('finalInbox')
                resolve(finalInbox)
            } catch(err) {
                console.log(err)
                reject(err)
            }
        })
        .catch((err) => {
            console.log(err)
            reject(err)
        })
    })

}

function getMsg(id) {
    console.log(`Get message body of id ${id}`)
    return new Promise((resolve, reject) => {
        let url = 'https://inboxkitten.com/api/v1/mail/getHtml?mailKey=' + id
        let config = {
            headers: {
                'Host': 'inboxkitten.com',
                'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="99", "Google Chrome";v="99"',
                'accept': 'application/json, text/plain, */*',
                'sec-ch-ua-mobile': '?0',
                'user-agent':' Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.74 Safari/537.36',
                'sec-ch-ua-platform': '"Windows"',
                'sec-fetch-site': 'same-origin',
                'sec-fetch-mode': 'cors',
                'sec-fetch-dest': 'empty',
                'referer': 'https://inboxkitten.com/inbox/flomd/detail/' + id,
                'accept-language': 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7,ms;q=0.6,fr;q=0.5,da;q=0.4'
            }
        }

        axios.get(url, config)
        .then((res) => {
            msgBody = res.data
            // Check if the msg id exist/valid
            if (msgBody.includes('The kittens found no messages')) {
                reject('invalid message id')
            } else {
                resolve(msgBody)
            }
        })
        .catch((err) => {
            console.log(err)
            reject(err)
        })
    })
}

module.exports = {
    getInbox,
    getMsg
}
