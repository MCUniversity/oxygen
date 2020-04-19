const Discord = require("discord.js")
const client = new Discord.Client()

const config = require("./config.json")

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)

    client.user.setActivity(`Do !help to get help.`, {type:"PLAYING"})
    let c = 1;
    setInterval(function(){
        if(c==0){
            client.user.setActivity(`Do !help to get help.`, {type:"PLAYING"})
            //console.log(`Do !help to get help.`)
            c++;
        } else if(c==1){
            client.user.setActivity(`Do !info to get info about me`, {type:"PLAYING"})
            //console.log(`Do !info to get info about me`)
            c++;
        } else if(c==2){
            client.user.setActivity(`I am an awsome bot`, {type:"PLAYING"})
            //console.log(`I am an awsome bot`)
            c=0;
        }


    }, 60000) //60 seconds


})

client.on('guildMemberAdd', member => {
    let embed = new Discord.MessageEmbed()
    .setColor("fffffc")
    .setTimestamp()
    .addField("New member joined", `Welcome, ${member.user.tag}.`)
    member.guild.channels.cache.get(config.WELCOMECHANNEL).send(embed)
})

client.on('guildMemberRemove', member => {
    let embed = new Discord.MessageEmbed()
    .setColor("fffffc")
    .setTimestamp()
    .addField("Member left", `Goodbye, ${member.user.tag}.`)
    member.guild.channels.cache.get(config.WELCOMECHANNEL).send(embed)
})

client.on('message', async (message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.PREFIX) !== 0) return;
    const args = message.content.slice(config.PREFIX.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();

    if(command=="ping"){
        let msg = await message.channel.send("Calculating...")
        msg.edit(`My ping is ${msg.createdTimestamp - message.createdTimestamp} ms.`)
    } else if (command=="help") {
        let embed = new Discord.MessageEmbed()
        .setColor("fffffc") //ffffff
        .setTimestamp()
        .setFooter("Made by MCUniversity")
        .addField("Help menu", "My commands are: \n!ping - shows the bot's ping\n!help - shows this embed")
        message.channel.send(embed)
    }




})







client.login(config.TOKEN)