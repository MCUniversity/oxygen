const Discord = require("discord.js")
const client = new Discord.Client()

const config = require("./config.json")

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}`)
})

client.on('message', async (message) => {
    if (message.author.bot) return;
    if (message.content.indexOf(config.PREFIX) !== 0) return;
    const args = message.content.slice(config.PREFIX.length).trim().split(/ +/g)
    const command = args.shift().toLowerCase();

    if(command=="ping"){
        let msg = await message.channel.send("Calculating...")
        msg.edit(`My ping is ${msg.createdTimestamp - message.createdTimestamp} ms.`)
    }




})







client.login(config.TOKEN)