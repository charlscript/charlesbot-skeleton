const { general } = require('../config/generals')
const { MessageMedia } = require('whatsapp-web.js')
const axios = require('axios');


exports.run = async (data, msg) => {
  const giphy = {
    baseURL: 'https://api.giphy.com/v1/gifs/',
    apiKey: '7IfGSmZdSFRLfxQaPcLtpQamsqj1ySOa',
    tag: 'random',
    type: 'random',
    rating: ''
  }
  let giphyURL = encodeURI(
    giphy.baseURL +
      giphy.type +
      '?api_key=' +
      giphy.apiKey +
      '&tag=' +
      giphy.tag +
      '&rating=' +
      giphy.rating
  )

  try {
    const res = await axios.get(giphyURL).then(res => {
      return res.data
    })

    let gif = res.data.embed_url.split('/')

    gif = 'https://i.giphy.com/media/' + gif[4] + '/giphy-downsized-small.mp4'
    MessageMedia.fromUrl(gif, { unsafeMime: true }).then(media => {
      msg.reply(media, null, { sendVideoAsGif: true })

    })
  } catch (error) {
    throw new Error('Não foi possível encontrar um macaco nesta selva!')
  }
}

exports.help = {
  name: 'Random',
  description: 'Gif aleatório',
  usage: `${general.prefix}random`
}
