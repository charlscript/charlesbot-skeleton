# Instalação

- google chrome
- nodeJS
- pm2
- npm
O bot espera uma execução em linux, caso esteja em outro sistema operacional, é preciso mudar o caminho do google chrome no arquivo connection.js, linha 14

Na pasta src, execute `npm i` para instalar as dependencias, e após instaladas, execute `pm2 start index ; pm2 monit index` para executar o sistema, um QR code aparecerá para ser escaneado no whatsapp pelo celular

## links úteis
https://github.com/pedroslopez/whatsapp-web.js/
https://wwebjs.dev/
https://www.npmjs.com/package/pm2
