const { reply } = require('../handler')
const { resolve } = require('path')
const { general } = require('../config/generals')
const { MessageMedia } = require('whatsapp-web.js');
const { readdir } = require('fs')


exports.run = async (data, msg) => {
    let tmpFile = {}
        const commands_path = resolve(__dirname)
        readdir(commands_path, (e, files) => {
            if (e) {
                console.error(e)
                return
            }
    
            files.forEach(jsFile => {
                const cmdFile = require(`./${jsFile}`)
                tmpFile[jsFile.replace('.js', '')] = {}
                tmpFile[jsFile.replace('.js', '')].name = cmdFile.help.name
                tmpFile[jsFile.replace('.js', '')].description = cmdFile.help.description
                tmpFile[jsFile.replace('.js', '')].usage = cmdFile.help.usage
            })
            // prettier-ignore
            let ajuda = ``;
            Object.keys(tmpFile).forEach(function (key) {
                let { description } = require(`./${key}.js`).help
                ajuda += `*${general.prefix}` + key + "* *↦* _" + description + "_" + '\n'
            })
            
            
            const media = MessageMedia.fromFilePath(`${general.DB_FOLDER}/imgs/banner.jpg`)
            msg.reply(media, null, {caption:ajuda})

        })
}

exports.help = {
    name: 'Menu',
    description: 'Menu do bot',
    usage: `${general.prefix}menu ou ${general.prefix}menu admin`,
}