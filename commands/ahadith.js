var Discord = require("discord.js")
var request = require("request")
var Prefix = require("../config/config.json").prefix
var cheerio = require('cheerio')
var checkvalidhadith = require("../util/checkvalidhadith.js")

exports.run = async (Client, message, args) => {
  try {
  var errmsg = `Invalid.\n**Usage:** ${Prefix}ahadith <collection> <book-number>:<hadith-number>\n**Example:** ${Prefix}ahadith bukhari 1:1\n**Collections:** bukhari, muslim, nasai, abudawud, tirmidhi, ibnmajah, malik, riyadussaliheen, adab, shamail, bulugh`;

  if (checkvalidhadith.check(message, args) == "false") { 
  return message.channel.send(errmsg)
  } else {
  var [chapter, book] = checkvalidhadith.check(message, args) 
  }

  var url = `https://sunnah.com/${args[0]}/${book}/${chapter}`;
  sendhadith(url)
 
 function sendhadith(url) {
  request({
     url: url,
     json: true
   },  async (err, res, text) => {
    
    var $ = cheerio.load(res.body)
    
    var hadith = $(`div[class="arabic_hadith_full arabic"]`).text()
    
    if (hadith == null || hadith == "") {
        var embed = new Discord.RichEmbed().setColor("RED")
        .setDescription("**invalid**").setTimestamp().setFooter("hadith command requested by " + message.author.tag)
        return message.channel.send(embed)
      } 
    
    if (hadith.length > 1999) {     
    var loop = hadith.match(/.{1,1999}/g);
    for (let i = 0; i < loop.length; i++) {
    var embed = new Discord.RichEmbed().setColor("GOLD").setTimestamp().setFooter(`Hadith ${args[0]} ${book}:${chapter} requested by `+ message.author.tag)
    embed.setDescription(loop[i])
    await message.channel.send(embed)
    }
      
    } else {
      
      var embed = new Discord.RichEmbed().setColor("GOLD").setTimestamp().setFooter(`Hadith ${args[0]} ${book}:${chapter} requested by ` + message.author.tag)
    embed.setDescription(hadith)
    await message.channel.send(embed)
      
    }
    
  });
   
 }
    
  } catch (e) {}
}
