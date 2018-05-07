const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const figlet = require('figlet');

const bot = new Discord.Client({disableEveryone: true});

var didNotEndWithQuestionmark = 
    [
        "Really hope your english teacher does not see this",
        "Did you go to school?",
        "You should think about re-doing 5th grade",
        "Online school is always an option",
        "?",
        "Your parents must be real proud of you"
    ]

var endedWithQuestionmark = 
    [
        "It is certain",
        "It is decidedly so",
        "Without a doubt",
        "Yes definitely",
        "You may rely on it",
        "As I see it, Yes",
        "Most likely",
        "Outlook seems good",
        "Yeah whatever keeps you smiling",
        "Signs are pointing to yes",
        "Reply is hazy, try again",
        "Ask me again later",
        "It's better not to tell you now",
        "I cannot predict right now",
        "Concentrate and ask me again",
        "Don't count on it",
        "Don't put your hopes on it",
        "My reply is No",
        "My sources are telling me no",
        "Outlook doesn't seem so good",
        "It's very doubtful"
    ]

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);
    function randomStatus() {
        let status = [`Quack reset!`, `type q!help for help `,`new bot's discord!`, `on ${bot.guilds.size} guilds!`]
        let rstatus = Math.floor(Math.random() * status.length);
        bot.user.setActivity(status[rstatus], {type: 'STREAMING' , url: 'https://www.twitch.tv/afif_123'});

    }; setInterval(randomStatus, 10000)
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
    
  if (message.content === `<@${bot.user.id}>`) {
        message.channel.send(`Hello <@${message.author.id}>, Quack With Prefix \`${prefix}\``);
  }
  if(cmd === `${prefix}ascii`){
        const text = args.join(" ");
    figlet(text, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    if (data.length > 2000) return message.channel.send("That is WAYYYY to long! You may wanna shorten up the word!")
    message.channel.send(`\`\`\`\n${data}\n\`\`\``)
  });
  }
	
  if(cmd === `${prefix}smash`){
	    const user = message.mentions.users.first();
  if (!user) {
    var embed = new Discord.RichEmbed()
    .setColor("RED")
    .setDescription("** You did not include a mention, please do so.**")
    message.channel.send({ embed: embed })
  }
  
  if (user.id === message.author.id) return message.channel.send("Why would you want to SMASH yourself?")
  if (user.id === bot.user.id) return message.channel.send("I dont think you would want to SMASH a bot...")
  message.channel.send(new Discord.Attachment("https://media.giphy.com/media/fCGvE4lCoY8fu/200.gif", "smash.gif"))
  message.channel.send(`**SMASSSH**\n**__${message.author.username}__** SMASHED **__${user.username}__**!`)
  }
	
  if(cmd === `${prefix}support`){
    let embed = new Discord.RichEmbed()
    .setTitle("SUPPORT!")
    .addField("Discord Official", "[**Click Here**](https://discord.gg/aDuF567)")
    .addField("Indonesian Developer Bot", "[**Click Here**](https://discord.gg/vgejeZB)")
    .addField("Vote And Invite!", `[**Click Here**](https://discordbots.org/bot/439427224941232138)`)
    .setColor("#09fa2b")
    message.channel.send(embed)
  }
    
  if(cmd === `${prefix}flip`){
      			const mapping = '¡"#$%⅋,)(*+\'-˙/0ƖᄅƐㄣϛ9ㄥ86:;<=>?@∀qƆpƎℲפHIſʞ˥WNOԀQɹS┴∩ΛMX⅄Z[/]^_`ɐqɔpǝɟƃɥᴉɾʞlɯuodbɹsʇnʌʍxʎz{|}~';
			const OFFSET = '!'.charCodeAt(0);
			 const args = message.content.split(' ').slice(1)
    if (args.length < 1) {
        message.channel.send('You must provide text to flip!');
    }

    message.channel.send(
        args.join(' ').split('')
            .map(c => c.charCodeAt(0) - OFFSET)
            .map(c => mapping[c] || ' ')
            .reverse().join('')
    );
  }
 
  

  if(cmd === `${prefix}kick`){

    //!kick @daeshan askin for it

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) {
        let qembed = new Discord.RichEmbed()
        .setDescription("**No player you want to kick**")
        .setColor("#ce0e00")
        return message.channel.send(qembed);
    }
    let kReason = args.join(" ").slice(22);
    if(!kReason) {
        let yembed = new Discord.RichEmbed()
        .setDescription("**Plase give me the reason!**")
        .setColor("#ce0e00")
        return message.channel.send(yembed)
    }
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
        let wembed = new Discord.RichEmbed()
        .setDescription("**You don't have permission for run this command!**")
        .setColor("#ce0e00")
        return message.channel.send(wembed);
    }
    if(kUser.hasPermission("MANAGE_MESSAGES")) {
        let eembed = new Discord.RichEmbed()
        .setDescription("**I don't have permission to kick this person!**")
        .setColor("#ce0e00")
        return message.channel.send(eembed)
    }

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("Kicked Player!")
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser}`)
    .addField("Kicked By", `<@${message.author.id}>`)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "mod-logs");
    if(!kickChannel) {
        let kickChannel = new Discord.RichEmbed()
        .setDescription("**Cannot find `mod-logs` channel**")
        .setColor("#ce0e00")
        return message.channel.send(kickChannel)
    }

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) {
        let qembed = new Discord.RichEmbed()
        .setDescription("**No player you want to ban**")
        .setColor("#ce0e00")
        return message.channel.send(qembed);
    }
    let bReason = args.join(" ").slice(22);
    if(!bReason) {
        let yembed = new Discord.RichEmbed()
        .setDescription("**Plase give me the reason!**")
        .setColor("#ce0e00")
        return message.channel.send(yembed);
    }
    if(!message.member.hasPermission("MANAGE_MEMBERS")) {
        let wembed = new Discord.RichEmbed()
        .setDescription("**You don't have permission for run this command!**")
        .setColor("#ce0e00")
        return message.channel.send(wembed);
    }
    if(bUser.hasPermission("MANAGE_MESSAGES")) {
        let eembed = new Discord.RichEmbed()
        .setDescription("**I don't have permission to ban this person!**")
        .setColor("#ce0e00")
        return message.channel.send(eembed)
    }

    let banEmbed = new Discord.RichEmbed()
    .setDescription("Banned Player!")
    .setColor("#bc0000")
    .addField("Banned User", `${bUser} with ID ${bUser.id}`)
    .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "mod-logs");
    if(!incidentchannel) {
        let IncidentChannel = new Discord.RichEmbed()
        .setDescription("**Cannot find `mod-logs` channel**")
        .setColor("#ce0e00")
        return message.channel.send(incidentChannel)
    }

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);


    return;
   }


  if(cmd === `${prefix}report`){

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) {
        let qembed = new Discord.RichEmbed()
        .setDescription("**1. No player you want to report**")
        .setColor("#ce0e00")
        message.channel.send(qembed);
    }

    let rreason = args.join(" ").slice(22);
    if(!rreason) {
        let yembed = new Discord.RichEmbed()
        .setDescription("2. Plase give me the reason!")
        .setColor("#ce0e00")
        message.channel.send(yembed)
    }

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
    .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", rreason);

    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) {
        let reportsChannel = new Discord.RichEmbed()
        .setDescription("**Cannot find `reports` channel**")
        .setColor("#ce0e00")
        message.channel.send(reportschannel)
    }


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }




  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("Server Information")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Created On", message.guild.createdAt)
    .addField("You Joined", message.member.joinedAt)
    .addField("Total Members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }



  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt);

    return message.channel.send(botembed);
  }

  if(cmd === `${prefix}help`){
    let helpembed = new Discord.RichEmbed()
    .setDescription("**BETA COMMAND** \n • `ban` - banned the player! \n • `kick` - kicked the player! \n • `report` - report the player! \n • `botinfo` - to see information of the bot! \n • `serverinfo` - to see information of the server! \n • `ascii` - turn text into ascii text! \n • `smash` - smash somebody! \n • `8ball` - ask me something! \n • `support` - for invite me and join server discord! \n • `flip` - your text will be reversed ")
    .setTimestamp()
    .setColor("#09fa4c")
    return message.channel.send(helpembed);
  }

  if(cmd === `${prefix}8ball`){
    const args = message.content.split(" ").slice(1).join(" ");
    if (!args) {
        const embed5 = new Discord.RichEmbed()
        .setDescription(`Do you really expect me to reply to **NOTHING**?`)
        .setColor(0x000000)
        message.channel.send({embed: embed5})
        return;
    }
    
    const embed = new Discord.RichEmbed()
    .setDescription(`:8ball: | ${endedWithQuestionmark[Math.floor(Math.random() * endedWithQuestionmark.length)]}`)
    .setColor(0x000000)
    
    if (!message.content.endsWith("?")) {
        const embed2 = new Discord.RichEmbed()
        .setDescription(`:8ball: | ${didNotEndWithQuestionmark[Math.floor(Math.random() * didNotEndWithQuestionmark.length)]}`)
        .setColor(0x000000)
        message.channel.send({embed: embed2})
        return;
    }
    
    if (message.content.endsWith("?")) {
        const embed = new Discord.RichEmbed()
        .setDescription(`:8ball: | ${endedWithQuestionmark[Math.floor(Math.random() * endedWithQuestionmark.length)]}`)
        .setColor(0x000000)
        message.channel.send({embed: embed})
    }
  }

});

bot.login(process.env.BOT_TOKEN);
