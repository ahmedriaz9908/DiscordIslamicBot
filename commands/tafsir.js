var Discord = require("discord.js");
var request = require("request");
var Prefix = require("../config/config.json").prefix;
var checkvalidverse = require(`../util/checkvalidverse.js`);
var cheerio = require('cheerio');

exports.run = async (Client, message, args) => {
  
  try {
    
    var errmsg = `Invalid.\n**Usage:** \n${Prefix}tafsir <surah number>:<ayah number>\n**Example:** ${Prefix}tafsir 3:3  `;
    
    if (checkvalidverse.check(message, args) == "false") {
      return send(errmsg, message)
    } else {
      var [surah, ayah] = checkvalidverse.check(message, args) 
    }
    
       if (ayah.includes(`-`)) {
       return send(errmsg, message)
       }
         var url = `https://www.altafsir.com/Tafasir.asp?tMadhNo=1&tTafsirNo=74&tSoraNo=${surah}&tAyahNo=${ayah}&tDisplay=yes&UserProfile=0&LanguageId=2`;
         await fetchTafsir(url, surah, ayah, message)
  
  } catch (e) {}
  
};


async function fetchTafsir(url, surah, ayah, message) {
      
       await request({
       
     url: url,
     json: true
       
   },  async (err, res, text) => {
       var $ = await cheerio.load(res.body)
       var tafsir = await $('font.TextResultEnglish').text()
       

     if (tafsir == "" || tafsir == null || tafsir == "In the name of Allah, the Beneficent, the Merciful." ) {
       
     var err = new Discord.RichEmbed()
     
     err.setTimestamp()
     err.setAuthor(`error`, message.author.avatarURL)
     err.setFooter(`tafsir of ${surah}:${ayah} requested by ` + message.author.tag)
     err.setColor("RED");
       
     await send(err, message)
     return;
       
     }
       var embeds = []
       
       if (tafsir.length > 1999) {     
       var loop = tafsir.match(/.{1,1999}/g);
         
         for (let i = 0; i < loop.length; i++) {
         embeds[i] = new Discord.RichEmbed()
         .setTimestamp().setAuthor(`tafsir`, message.author.avatarURL).setFooter(`tafsir of ${surah}:${ayah} requested by ` + message.author.tag).setColor("GOLD").setDescription(loop[i])
         }
         
         await embeds.forEach(async e => await send(e, message))
         
       } else {
         
         embeds[0] = new Discord.RichEmbed()
         .setTimestamp().setAuthor(`tafsir`, message.author.avatarURL).setFooter(`tafsir of ${surah}:${ayah} requested by ` + message.author.tag).setColor("GOLD").setDescription(tafsir)
         await embeds.forEach(async e => await send(e, message))
     
       }
        
       })
   
               }

async function send(content, message) {
  await message.channel.send(content).catch(e=>{})
  return 
}
