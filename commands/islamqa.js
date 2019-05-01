var Discord = require("discord.js");
var request = require("request");
var Prefix = require("../config/config.json").prefix;
var cheerio = require('cheerio');

  exports.run = async (Client, message, args) => {
  if (!args[0]) return message.channel.send(`Invalid. Type **.help** for more help on this command.\n**Usage:** ${Prefix}islamqa <query>\n**Example:** ${Prefix}islamqa playing with dolls`);
  var query = (`islamqa ` + args.join(' ')).replace(/ /g, '+');
  if (!args[1]) return message.channel.send(`❌ query should be at least 2 words long.`);
  var url = `https://google.com/search?q=${query}`;

  request({
     url: url,
     json: true
   },  (err, res, text) => {
    
    var embed = new Discord.RichEmbed().setColor('GOLD').setTimestamp().setFooter(`islamqa query command by ` + message.author.tag);
    
    var $  = cheerio.load(res.body);
    
    var links = $(`#res a`);
    
    for (let i = 0; i < links.length; i++) {   
      
    if (i == 1 || i % 2 !== 0) {} else {
      
    var link = links[i].attribs.href;
      
    link = link.slice(link.indexOf("https://islamqa.info"));
      
    link = link.slice(0, link.indexOf("&sa"));
      
    var details = (link.split('/'));
      
    if (details !== undefined || details !== null || link !== null || link !== undefined || link !== "" || details !== "") {
      
    var details = details.slice(-1)[0].replace(/-/g, ' ').replace(/\+/g, ' ');
      
    try {
      
    embed.addField(details, `[Click here](${link})`);
      
    } catch (e) {}
      
    }}}
    
    message.channel.send(embed);
    
  })  
    
}