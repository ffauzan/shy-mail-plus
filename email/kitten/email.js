const axios = require('axios').default


function getInbox(name) {
    console.log('get inbox for address '+name)
    return new Promise((resolve, reject) => {
        // let domain = ''
        let address = name
        let url = 'https://inboxkitten.com/api/v1/mail/list?recipient=thedumpsterofflyxt'
    
        var unfilteredInbox = []
        var finalInbox = []
        axios.get(url)
        .then((res) => {
            unfilteredInbox = res.data
            if (unfilteredInbox.length === 0) {
                reject('no address')
            }
            // console.log(res.data[1])
            try {
                const filteredInbox = unfilteredInbox.filter((email) => {
                    return (email.message.headers.to === address)
                })
                // console.log(filteredInbox)
    
                filteredInbox.forEach(email => {
                    let keyPrefix = email.storage.url.substring(8, 10) + '-'
                    inboxData = {
                        'key': keyPrefix + email.storage.key,
                        'time': email.timestamp,
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

// console.log(getInbox('flomdmoz'))

exports.getInbox = getInbox
