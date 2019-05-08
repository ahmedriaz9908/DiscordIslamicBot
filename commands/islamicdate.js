var Discord = require("discord.js");
var request = require("request");
var Prefix = require("../config/config.json").prefix;
var fetch = require('node-fetch');

exports.run = async (Client, message, args) => {
try {
  
var errmsg = `Invalid.\n**Usage:** ${Prefix}islamicdate <city> <optional:country>\n**Example:** ${Prefix}islamicdate edmonton canada`

var city = args[0]

var country = args[1]

if (!city) return message.channel.send(errmsg)
  
const URL = 'http://api.aladhan.com/v1/timingsByCity?city=' + city+ '&country=' + country+'&method=4'
  
                     fetch(URL)
            .then(response => {
                       
              if (response.status === 200) {                
              return response.json();               
              } else {               
              return response;              
              }
                       
            })
  
            .then(response => {
                       
              console.debug(response.data);
                       if (response.data == undefined || response.data == null) return message.channel.send(`error, pls try again`);
                       
                       var embed = new Discord.RichEmbed().setColor("GOLD")
                       embed.setTitle(`:date: ISLAMIC DATE\nREQUESTED: ${args.join(' ').toUpperCase()}\nDEDICATED TIME ZONE: ${response.data.meta.timezone.toUpperCase()} :kaaba:\n------------------------------------------------------------`)
                       embed.addField(`Date`, `**${response.data.date.hijri.date}** `)
                       embed.addField(`Day`, `**${response.data.date.hijri.day}** `)
                       embed.addField(`Weekday`, `**${response.data.date.hijri.weekday.en}** `)
                       embed.addField(`Month`, `**${response.data.date.hijri.month.en}** `)
                       embed.addField(`Year`, `**${response.data.date.hijri.year}** \n **------------------------------------------------------------**`)
                       .setTimestamp()
                       .setFooter(`Islamic date command, requested by ` + message.author.tag)
                       
                       message.channel.send(embed) 
                       
            }).catch(error => {
                       
              console.error(error);
                       
            });
  
  } catch (e) {}   
  
        }
                                    
  
