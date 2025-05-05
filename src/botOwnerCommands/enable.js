const fs = require('fs')
const { reply } = require('../handler')
const { general } = require('../config/generals')

exports.run = async (data, msg) => {
    const enabledPath = `${general.ENABLED}`
    const enabled = require(enabledPath)
    if(!enabled[data.id]) {
        let newEnabled = enabled;
        newEnabled[data.id] = true;

        fs.writeFileSync(enabledPath, JSON.stringify(newEnabled), 'utf-8');

        await reply(msg, `${general.botName} ativado! Veja ${general.prefix}menu para ajuda!`)
    } else {
        return await reply(msg, `${general.botName} já está ativo!`)
    }
}