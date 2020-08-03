const config = require('../config')

const quote = require('./quote')
const site = require ('./site')

const commands = [
    { 'command': 'quote', 'function': quote},
    { 'command': 'site', 'function': site}
]

module.exports = commands