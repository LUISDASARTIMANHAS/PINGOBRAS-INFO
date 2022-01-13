const { Client, version } = require('discord.js');
const { 
    token
} = require('./config.json')
const bot = new Client();

bot.on("ready", async() => {
    console.log(`[ Client ] ${bot.user.tag} ESTA ONLINE AGORA`);
  
  bot.user.setPresence({
        status: 'dnd',
        activity: {
            name: 'CAÇA AOS RATOS DO QUINTAL',
            type: 'PLAYING'        }
    })
})
 

bot.login(token)