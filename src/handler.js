const { general } = require( "./config/generals")
const fs = require('fs')
const permitted = require(general.ENABLED)

exports.message_create = async (msg, client) => {
    const {...data} = await messageDataExtractor(msg, client)

    if(data.command && data.fromMe && botOwnerCommands.has(data.command)) {
        await executor(`${general.BOT_OWNER_COMMANDS_FOLDER}/${data.command}`, data, msg)
    }

    if (!data.enabled) {
        return
    }
    
    if(data.command && commands.has(data.command)) {
        await executor(`${general.COMMANDS_FOLDER}/${data.command}`, data, msg)
    }
}

exports.message_notification= async (notification, client, type) => {

    // disparado em eventos quando alguém entra ou sai de um grupo, remova o return para ativar
    return
    const chat = await notification.getChat()
    const id = chat.isGroup ? chat.id.user : msg.id.remote
    const enabled = permitted[id] ? true : false
    const contact = await client.getContactById(notification.id.participant);


    if (enabled) {

        if (type === 'group_join') {
            chat.sendMessage(`${general.prefixEmoji}: Bem vindo ao grupo ${chat.name}, @${contact.id.user}\n\nLeia as regras/descrição do grupo: \n\n${chat.description}
            `, { mentions: [contact] })
        }
    }

}

const executor = async(file, data, msg) => {
       try {
            await msg.react("🔁")

            if (data.args[0].toLowerCase().startsWith('ajuda')) {
                const help = require(file).help
                msg.reply(`${general.prefixEmoji}:\n _*${help.description}*_ \n ${help.usage}`)
                
            } else {
                await require(file).run(data, msg)
            }
            await msg.react("✅")
            
            
       } catch (error) {
            await this.reply(msg, error.message)
            await msg.react("❌")
      
       }   
}

//Extração de dados da mensagem, incluindo comando
const messageDataExtractor = async (msg, client) => {

    const fromMe = msg.fromMe
    const command = msg.body.startsWith(general.prefix) ? msg.body
    .split(general.prefix)[1]
    .split(' ')[0]
    .toLowerCase() : null
    const args = command ? msg.body
    .slice(general.prefix.length + command.length)
    .trim()
    .split(' ') : null
    const chat = await msg.getChat()
    const body = msg.body
    const id = chat.isGroup ? chat.id.user : msg.id.remote
    const enabled = permitted[id] ? true : false
    const pushname = await msg.rawData.notifyName
    let isAdmin = false
    if(chat.isGroup) {
        const participant = await chat.participants.find(p => p.id._serialized === msg.author);
        if (participant?.isAdmin || participant?.isSuperAdmin || msg.fromMe) {
            isAdmin = true
        }
    }
  
    return {
        fromMe,
        command,
        args,
        chat,
        body,
        id,
        enabled,
        pushname,
        isAdmin,
        client
    }

}

exports.reply = async (msg, text) => {
    return msg.reply(`${general.prefixEmoji}: ${text}`)
}

const commands = new Set()
    fs.readdir(general.COMMANDS_FOLDER, (e, files) => {
        if (e) return console.lerror(e)

        files.forEach(command => {
            commands.add(command.replace('.js', ''))
        })
    })

const botOwnerCommands = new Set()
    fs.readdir(general.BOT_OWNER_COMMANDS_FOLDER, (e, files) => {
        if (e) return console.lerror(e)

        files.forEach(command => {
            botOwnerCommands.add(command.replace('.js', ''))
        })
    })