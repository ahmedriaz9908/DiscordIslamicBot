var Discord = require("discord.js");
var request = require("request");
var Prefix = require("../config/config.json").prefix;
var checkvalidverse = require(`../util/checkvalidverse.js`);

exports.run = async (Client, message, args) => {
  
  try {
    
    var errmsg = `Invalid.\n**Usage:** \n${Prefix}aquran <surah number>:<ayah number>\n${Prefix}aquran <surah number>:<startverse>-<endverse>  (max 5 verses at once)\n**Example:** ${Prefix}aquran 3:3\n${Prefix}aquran 3:3-5  `;
    
    if (checkvalidverse.check(message, args) == "false") {
      return message.channel.send(errmsg)
    } else {
      var [surah, ayah] = checkvalidverse.check(message, args) 
    }
    
       if (ayah.includes(`-`)) {
       var x = ayah.slice(0, ayah.indexOf('-'))
       var y = ayah.slice(ayah.indexOf('-') + 1)
       if (y < x)  {
       [x, y] = [y, x] 
       if ((x - y) > 5) return message.channel.send(errmsg)
       if (x == 0) return message.channel.send(errmsg)
    
       var url = `http://quranapi.azurewebsites.net/api/verse/?chapter=${surah}&start=${x}&end=${y}`;
       } else {
         if ((y - x) > 5) return message.channel.send(errmsg)
         if (y == 0) return message.channel.send(errmsg)
         var url = `http://quranapi.azurewebsites.net/api/verse/?chapter=${surah}&start=${x}&end=${y}`;
       }
         
    } else {
      
       var url = `http://quranapi.azurewebsites.net/api/verse/?chapter=${surah}&number=${ayah}`
       
    }
   console.log(url)
     request({
       
     url: url,
     json: true
       
   },  (err, res, text) => {
       
   if (err) {
 console.log(err); 
     
}
     var embed, embeds
      
     if (res.body == null) {
       
     var err = new Discord.RichEmbed()
     
     err.setTimestamp()
     err.setAuthor(`error`, message.author.avatarURL)
     err.setDescription(`**invalid**`)
     err.setFooter(`requested by ` + message.author.tag)
     err.setColor("RED");
       
     return message.channel.send(err);
       
     }

       if (ayah.includes(`-`)) {
         
         embeds = [];
         
         for (let i = 0; i < res.body.length; i++) {  
           
        embeds[i] = new Discord.RichEmbed()
        .setDescription(`**Surah ${res.body[i].Chapter}, ${res.body[i].ChapterName} | ayah: ${res.body[i].Id}**\n\n**${res.body[i].Text}**`)
        .setColor('GOLD')
        .setFooter(`verse ${res.body[i].Chapter}:${res.body[i].Id} requested by ` + message.author.tag)
        .setTimestamp();
           
         }
         
        embeds.forEach(e=>message.channel.send(e));
         
       } else { 
         
        embed = new Discord.RichEmbed()
         
        .setTimestamp()   
        .setDescription(`**Surah ${res.body.Chapter}, ${res.body.ChapterName} | ayah: ${res.body.Id}**\n\n**${res.body.Text}**`)
        .setColor('GOLD')
        .setFooter(`verse ${res.body.Chapter}:${res.body.Id} requested by ` + message.author.tag)
         
        return message.channel.send(embed) 
         
       }
       
   });
    
  } catch (e) {}
  
};
