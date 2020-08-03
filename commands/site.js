function sendSite(message) {
    message.channel.send(`https://quote.mylocalhost.app/${message.guild.id}`)
}

module.exports = sendSite