const { reply } = require('../handler')
const { general } = require('../config/generals')

exports.run = async (data, msg) => {
    reply(msg, 'Pong!')
}

exports.help = {
    name: "Ping",
    description: "Verifica se o bot está online",
    usage: `${general.prefix}ping`,
};