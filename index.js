const Discord = require('discord.js')
const { prefix, token } = require('./config.json')
const client = new Discord.Client()

client.once('ready', () => {
    console.log('Ready!')
})

client.on('message', message => {
    if (message.content.startsWith(`${prefix}quote`)) {
        quoteIt()
    }
})

function quoteIt(message) {
    let quote = message.content.substring(7)
    let quotedPerson = message.mentions.members.last()

    if (quotedPerson === undefined || !quote.endsWith('>')) {
        message.channel.send('Who are you quoting? Mention them at the end of the quote!')
        return;
    }

    quote = quote.substring(0, quote.lastIndexOf('<'))
    message.channel.send(`Quoted: ${quote} - ${quotedPerson} 2020`)
}

client.login(token);