 var Prefix = require("../config/config.json").prefix
 var Discord = require("discord.js")
 
 exports.run = async (Client, message, args) => {
   
   try {
     
   var embed = new Discord.RichEmbed()
   .setColor("GOLD")
   .setAuthor(`Help`, message.author.avatarURL)
   .addField(`${Prefix}islamicdate`, `Returns islamic date for specified city.\n**Usage:** ${Prefix}islamicdate <city> <optional:country>\n**Example:** ${Prefix}islamicdate edmonton canada**\n------------------------------------------------------------**`)
   .addField(`${Prefix}islamqa`, `Returns islamqa links based on your query.\n**Usage:** ${Prefix}islamqa <query>\n**Example:** ${Prefix}islamqa playing with dolls\n**------------------------------------------------------------**`)
   .addField(`${Prefix}quran | ${Prefix}aquran`, `Returns english/arabic version of requested verse(s)\n**Usage:**\n${Prefix}quran <surah number>:<ayah number(s)> \n${Prefix}aquran <surah number>:<ayah number(s)> \n**Examples:**\n${Prefix}quran 3:1-3\n${Prefix}aquran 3:3\n **------------------------------------------------------------**`)
   .addField(`${Prefix}hadith | ${Prefix}ahadith`, `Returns specified hadith in english/arabic\n**Usage:**\n${Prefix}hadith <collection> <book-number>:<hadith-number>\n${Prefix}ahadith <collection> <book-number>:<hadith-number>\n**Example:**\n${Prefix}hadith bukhari 1:1\n${Prefix}ahadith bukhari 1:1\n**Collections:** bukhari, muslim, nasai, abudawud, tirmidhi, ibnmajah, malik, riyadussaliheen, adab, shamail, bulugh\n **------------------------------------------------------------**`)
   .addField(`${Prefix}prayertimes | ${Prefix}pt`, `Returns prayer timings for specified city\n**Usage:** ${Prefix}prayertimes <city> <optional:country>\n**Example:** ${Prefix}prayertimes calgary canada\n **------------------------------------------------------------**`)
   .addField(`${Prefix}tafsir`, `**Coming soon**`)
   .setFooter(`Help, requested by ` + message.author.tag)
   .setTimestamp();
     
     if (message.guild)  { message.author.send(embed), message.channel.send(`sent you help, check your dms!`) } else { message.channel.send(embed)}
    
   } catch (e) {}
 }