var Discord = require("discord.js");
var request = require("request");
var fs = require("fs");
var Config = require(__dirname + "/config/config.json")
var Client = new Discord.Client();
var Prefix = Config.prefix;
var BotToken = Config.token;

Client.on("ready", async function() {

console.log(`logged in as ${Client.user.tag}, Client ID: ${Client.user.id}`)
Client.user.setActivity(`.help | in ${Client.guilds.size} server(s) oof`, {type : "LISTENING"})
})

Client.on("message", async message => {

    const args = message.content.slice(Prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    if (message.content.indexOf(Prefix) !== 0) return;
    if (message.author.bot) return;
       try {
        let commandf = require(`./commands/${command}.js`);
        commandf.run(Client, message, args);
    } catch (err) {
      return;
    }

});

Client.login(BotToken);
