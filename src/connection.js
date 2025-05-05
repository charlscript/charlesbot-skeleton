const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const { message_create, message_join, message_notification, reply } = require('./handler')
const fs = require('fs')
const moment = require('moment')
const { general } = require('./config/generals')
const { MessageMedia } = require('whatsapp-web.js');

exports.connect = async () => {
  const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      headless: true,
      executablePath: '/usr/bin/google-chrome-stable',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    }
  })
  client.on('qr', qr => {
    qrcode.generate(qr, { small: true })
  })

  client.on('loading_screen', (percent, message) => {
    console.log('LOADING SCREEN', percent, message)
  })

  client.on('authenticated', () => {
    console.log('AUTHENTICATED')
  })

  client.on('auth_failure', msg => {
    console.error('AUTHENTICATION FAILURE', msg)
  })

  client.on('ready', () => {
    console.log('READY')
  })

  client.on('message_create', async msg => {
    message_create(msg, client)
  })

  client.on('group_join', async notification => {
    message_notification(notification, client, 'group_join')
  });

  client.on('group_leave', (notification) => {
    // User has left or been kicked from the group.
    // console.log('leave', notification);
    // notification.reply('User left.');
  });

  client.on('group_update', (notification) => {
    // Group picture, subject or description has been updated.
    // console.log('update', notification);
  });


  client.on('call', async (call)=> {
    //handle calls
    
  });

  client.on('change_state', state => {
    console.log('CHANGE STATE', state);
  });
  client.initialize()
}
