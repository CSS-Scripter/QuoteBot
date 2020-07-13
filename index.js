const Discord = require('discord.js')
const { prefix, hostname, token } = require('./config.json')
const http = require('http')

const client = new Discord.Client()

client.once('ready', () => {
    console.log('Ready!')
})

client.on('message', message => {
    if (message.content.startsWith(`${prefix}quote`)) {
        quoteIt(message)
    }
})

function quoteIt(message) {
    let quote = message.content.substring(7)
    let quotedPerson = message.mentions.members.last()

    if (quotedPerson === undefined || !quote.endsWith('>')) {
        message.channel.send('Who are you quoting? Mention them at the end of the quote!')
        return;
    }

    quotedPerson = quotedPerson.user.username
    quote = quote.substring(0, quote.lastIndexOf('<'))

    const url = 'localhost:3000'
    const body = JSON.stringify({
        message: quote,
        by: quotedPerson,
        year: '2000'
    })

    const options = {
        hostname: hostname,
        port: 80,
        path: '/v1/new',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': body.length
        }
    }

    const request = http.request(options, (res) => {
        console.log(`Statuscode: ${res.statusCode}`)
        console.dir(res)

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

client.login(token);