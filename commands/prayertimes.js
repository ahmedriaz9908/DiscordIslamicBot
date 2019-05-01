 var Discord = require("discord.js");
 var request = require("request");
 var Prefix = require("../config/config.json").prefix;
 var to12hours = require("../util/to12hours.js");
 var fetch = require("node-fetch");

 exports.run = async (Client, message, args) => {
   
   try {
          var city = args[0];
          var country = args[1];
          const URL = 'http://api.aladhan.com/v1/timingsByCity?city=' + city+ '&country=' + country+'&method=4';
  
           fetch(URL)
           .then(response => {
              if (response.status === 200) {
                return response.json();
              } else {
                message.channel.send(`unable to get prayer timings for that city (possibly due to bot), try again`);
              }
           })
           .then(response => {
           if (response == null || response == "") return;
            try {
                       var embed = new Discord.RichEmbed().setColor("GOLD")
                       embed.setTitle(`:clock1: PRAYER TIMINGS :kaaba:\nREQUESTED: ${args.join(' ').toUpperCase()}\nDEDICATED TIME ZONE: ${response.data.meta.timezone.toUpperCase()}\n------------------------------------------------------------`)
                       embed.addField(`FAJR`, ` **${to12hours.to12hour(response.data.timings.Fajr)}** `)
                       embed.addField(`SUNRISE`, ` **${to12hours.to12hour(response.data.timings.Sunrise)}** `)
                       embed.addField(`DHUHR`, ` **${to12hours.to12hour(response.data.timings.Dhuhr)}** `)
                       embed.addField(`ASR`,  ` **${to12hours.to12hour(response.data.timings.Asr)}** `)
                       embed.setTimestamp()
                       embed.setFooter(`Prayer times command requested by ` + message.author.tag)
                       embed.addField(`MAGHRIB`, ` **${to12hours.to12hour(response.data.timings.Maghrib)}** `)
                       embed.addField(`ISHA`, `**${to12hours.to12hour(response.data.timings.Isha)}** \n ------------------------------------------------------------`)
            message.channel.send(embed).catch()
            } catch (e) {
            console.log(e)
            }
           });
   } catch (e) {}
 }
 