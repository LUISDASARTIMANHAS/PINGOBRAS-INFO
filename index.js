const { Client, version } = require('discord.js');
const express = require('express');

const app = express();

app.get("/", (request, response) => {

const ping = new Date(); 

  ping.setHours(ping.getHours() - 3);

  console.log(`Ping recebido às ${ping.getUTCHours()}:${ping.getUTCMinutes()}:${ping.getUTCSeconds()}`);

  response.sendStatus(200)

});


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