const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true});
const cfg = require("./botconfig.json");
const fs = require("fs");

bot.on("message", async message => {

    let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
    if (!prefixes[message.guild.id]) {
        prefixes[message.guild.id] = {
            prefixes: cfg.prefix
        };
    }
    let prefix = prefixes[message.guild.id].prefixes;
    let msg = message.content.toLowerCase();
    let sender = message.author;
    let args = message.content.slice(prefix.length).trim().split(" ");
    let cmd = args.shift().toLowerCase();

    if (message.content === `<@${bot.user.id}>`) {
        message.channel.send(`Hi <@${message.author.id}>, my prefix is \`${prefix}\``);
        message.react('👌');
    }

    if (sender.bot) return;
    if (!message.content.startsWith(prefix)) return;

    try {
        let commandFile = require(`./cmds/${cmd}.js`);
        commandFile.run(bot, message, args);
    } catch(e) {
        console.log(e.message);
    } finally {
        console.log(`${message.author.username} | ${cmd} | ${message.guild.name}`);
    }
});

bot.on("guildMemberAdd", member => {

    bot.user.setActivity(`New Member ${member} On ${member.guild.name}`)

    const log = bot.channels.get("437894427600486403")

    let embed = new Discord.RichEmbed()
    .setTitle("MEMBER JOINED")
    .addField("Member Name", `${member.user.username}`)
    .addField("Note", "Plase Read Rules And Have Fun The Server!")
    .setTimestamp()
    .addField("Now Total Members", `${bot.users.size}`)
    .setColor("#fa0606")
    .setFooter(`MemberAdd AutoCmd On ${member.guild.name}`)
    log.send({ embed: embed })
});

bot.on("guildMemberRemove", member => {

    const log = bot.channels.get("437894427600486403")

    let embed = new Discord.RichEmbed()
    .setTitle("MEMBER LEAVE")
    .addField("Member Name", `${member.user.username}`)
    .addField("Note", "Plase Reconnect!")
    .setTimestamp()
    .addField("Now Total Members", `${bot.users.size}`)
    .setColor("#0afa66")
    .setFooter(`MemberRemove AutoCmd On ${member.guild.name}`)
    log.send({ embed: embed })
});

bot.on("guildCreate", guild => {
    const log = bot.channels.get("437894427600486403")
    
    let embed = new Discord.RichEmbed()
    .setTitle("Remove Guilds")
    .addField("Guild Name", `${guild.name}`)
    .addField("Owner Server", `${guild.owner.user.username}`)
    .addField("Now Total Servers", `${bot.guilds.size}`)
    .setFooter("New Public Cmd")
    log.send({ embed: embed })
});
  
bot.on("guildDelete", guild => {

    const log = bot.channels.get("437894427600486403")
    
    let embed = new Discord.RichEmbed()
    .setTitle("New Guilds")
    .addField("Guild Name", `${guild.name}`)
    .addField("Owner Server", `${guild.owner.user.username}`)
    .setFooter("New Public Cmd")
    .addField("Now Total Servers", `${bot.guilds.size}`)
    log.send({ embed: embed })
});

bot.on("channelCreate", channel => {
	
	const log = bot.channels.get("437894427600486403")
	var embed = new Discord.RichEmbed()
	.setTitle("Channel Created!")
	.setColor("#0afa66")
    .setTimestamp()
    .addField("Now Total Channels", `${bot.channels.size}`)
	.addField(`Channel Name: ${channel.name}`, `Has Created On Server ${channel.guild.name}`)
	log.send({ embed: embed })
});

bot.on("channelDelete", channel => {
	const log = bot.channels.get("437894427600486403")
	var embed = new Discord.RichEmbed()
	.setTitle("Channel Deleted!")
	.setColor("#0afa66")
    .setTimestamp()
    .addField("Now Total Channels", `${bot.channels.size}`)
	.setThumbnail(`${channel.guild.iconURL}`)
	.addField(`Channel Name : ${channel.name}`, `Has Deleted On Server ${channel.guild.name}`)
	log.send({ embed: embed })
});


bot.on("ready", async () => {
    console.log(`${bot.user.tag} is ready!`);

    bot.user.setStatus("dnd")
});

bot.login(process.env.BOT_TOKEN);
