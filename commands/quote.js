const http = require('http')
const config = require('../config')

function quoteIt(message) {
    let quote = message.content.substring(7)
    let quotedPerson = message.mentions.members.last()

    if (quotedPerson === undefined || checkQuote(quote)) {
        message.channel.send('Who are you quoting? Mention them at the end of the quote!')
        return;
    }

    quotedPerson = quotedPerson.user.username
    quote = cleanupQuote(quote)

    const body = JSON.stringify({
        message: quote,
        by: quotedPerson,
        year: '2020'
    })

    const serverId = message.guild.id

    const options = {
        hostname: config.hostname,
        port: config.port,
        path: `/${serverId}/new`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': body.length
        }
    }

    const request = http.request(options, (res) => {
        console.log(`Statuscode: ${res.statusCode}`)

        res.on('data', (d) => {
            console.log(d)
        })

        message.channel.send(`Quoted: ${quote} - ${quotedPerson} 2020`)
    })

    request.on('error', (e) => {
        console.error(e)
    })

    request.write(body)
    request.end()
}

function checkQuote(quote) {
    return !quote.endsWith('>')
}

function cleanupQuote(quote) {
    return quote.substring(0, quote.lastIndexOf('<')).replace(/\s+$/, '')
}

module.exports = quoteIt