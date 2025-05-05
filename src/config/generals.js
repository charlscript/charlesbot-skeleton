const {resolve} =require('path')

exports.general = {
    botName: 'Charles bot',
    prefix: '!',
    prefixEmoji: '🤖',
    errorEmoji: '❌',
    DB_FOLDER: resolve(__dirname, "..","db"),
    imgs: resolve(__dirname, "..", "db", "imgs"),
    ENABLED: resolve(__dirname, "enabled.json"),
    COMMANDS_FOLDER: resolve(__dirname, "..", 'commands'),
    BOT_OWNER_COMMANDS_FOLDER: resolve(__dirname, "..", 'botOwnerCommands'),
}