const axios = require('axios').default


function getInbox(name) {
    let domain = '@shy.my.id'
    let address = name + domain

    let url = 'https://inboxkitten.com/api/v1/mail/list?recipient=thedumpsterofflyxt'

    var unfilteredInbox = []
    axios.get(url)
    .then((res) => {
        unfilteredInbox = res.data
        // console.log(res.data[1])
        const filteredInbox = unfilteredInbox.filter((email) => {
            return (email.message.headers.to === address)
        })

        console.log(filteredInbox)
    })
    .catch((err) => {
        console.log(err)
    })
}

getInbox('flomdmoz')
