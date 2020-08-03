const Discord = require('discord.js')
const config = require('./config')
const commands = require('./commands/commands')

const client = new Discord.Client()

client.once('ready', () => {
    console.log('Ready!')
})

client.on('message', message => {
    for (let command of commands ) {
        if (message.content.startsWith(`${config.prefix}${command.command}`)) {
            command.function(message)
        }
    }
})


client.login(config.token);