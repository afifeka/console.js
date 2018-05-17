const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const figlet = require('figlet');
const weather = require('weather-js');
let xp = require("./xp.json");


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
        let status = [`Moderation Comming!`, `type c!help for help `, `on ${bot.guilds.size} guilds!`]
        let rstatus = Math.floor(Math.random() * status.length);
        bot.user.setActivity(status[rstatus], {type: 'STREAMING' , url: 'https://www.twitch.tv/afif_123'});

    }; setInterval(randomStatus, 10000)
  bot.user.setUsername("Chicken");
});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);
	
    let xpAdd = Math.floor(Math.random() * 7) + 8;
  console.log(xpAdd);

  if(!xp[message.author.id]){
    xp[message.author.id] = {
      xp: 0,
      level: 1
    };
  }


  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvl = xp[message.author.id].level * 300;
  xp[message.author.id].xp =  curxp + xpAdd;
  if(nxtLvl <= xp[message.author.id].xp){
    xp[message.author.id].level = curlvl + 1;
    let lvlup = new Discord.RichEmbed()
    .setTitle("Level Up!")
    .setColor("RED")
    .addField("New Level", curlvl + 1);

    message.channel.send(lvlup).then(msg => {msg.delete(5000)});
  }
  fs.writeFile("./xp.json", JSON.stringify(xp), (err) => {
    if(err) console.log(err)
  });
    
  if (message.content === `<@${bot.user.id}>`) {
        message.channel.send(`Hello <@${message.author.id}>, ${bot.user.username} With Prefix \`${prefix}\``);
  }
  if(cmd === `${prefix}dm`){
    const DMatron = args.join(" ")
    if (!DMatron) return message.channel.send("**ERROR**\nYou did not include something you would like to DM me, please do!")
    message.author.send(DMatron)
    }
	
  if(cmd === `${prefix}weather`){
	      const city = message.content.split(" ").slice(1).join(" ")
    if (!city) return message.channel.send("**Error**\nYou did not include a city! Please include it so we can show the forecast!")

    weather.find({search: city, degreeType: 'F'}, function(err, result) {
        if (err) {
            message.channel.send(":x: No results on that city")
            console.log(err.stack)
            return;
        } 
        let url;
        if (result[0].current.skytext === "Mostly Sunny") url = "https://openclipart.org/image/2400px/svg_to_png/3367/ivak-Decorative-Sun.png"
        else if (result[0].current.skytext === "Mostly Cloudy" || result[0].current.skytext === "Cloudy") url = "https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Weather-heavy-overcast.svg/200px-Weather-heavy-overcast.svg.png"
        else if (result[0].current.skytext === "Partly Cloudy") url = "";
        message.channel.send(JSON.stringify(result[0].current, null, 2))
        var embed = new Discord.RichEmbed()
        .setTitle(`Forecast for ${result[0].location.name}`)
        .setColor("BLUE")
        .setThumbnail(result[0].current.imageUrl)
        .setTimestamp()
        .addField(":thermometer: Temperature", `**__${result[0].current.temperature}__ Degrees Fahrenheit**`)
        .addField(":city_sunset: What it looks like outside", `**__${result[0].current.skytext}__**`)
        .addField(":wind_blowing_face: Feels Like", `**__${result[0].current.feelslike}__ Degrees Fahrenhiet**`)
        .addField(":sweat: Humidity", `**__${result[0].current.humidity}%__**`)
        .addField(":wind_blowing_face: Wind Speed", `**__${result[0].current.windspeed.replace("mph", "Miles Per Hour")}__**`)
        message.channel.send({ embed: embed })
})};

	
  if(cmd === `${prefix}avatar`){
	  
    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(member.user.tag)
    .setDescription(`[Avatar Link](${member.user.displayAvatarURL})`)
    .setImage(member.user.displayAvatarURL);

    message.channel.send(embed);

  }     
  if(cmd === `${prefix}ping}`){
	message.channel.send("Pinging...").then(m => {
        var lat_ms = (m.createdTimestamp - message.createdTimestamp);
        var api_ms = (Math.round(bot.ping));
        m.delete().then().catch(console.error);
    
        let embed = new Discord.RichEmbed()
        .addField(":signal_strength: | Latency", lat_ms + "ms", true)
        .addField(":computer: | API", api_ms + "ms", true)
        .setDescription(":ping_pong: | Pong!")
        .setColor(0x00AE86)
        message.channel.send(embed);
    });
}
	
	
  if(cmd === `${prefix}eval`){
	
const hastebin = require('hastebin-gen');
const settings = require('./botconfig.json');
	
	
	
    var embed = new Discord.RichEmbed()
  .setTitle("Restricted")
    .setColor("#f45f42")
  .addField("You are restricted from this command", "Its for the bot owners only!")
		
  const randomColor = "#000000".replace(/0/g, function () { return (~~(Math.random() * 16)).toString(16); });
  const clean = text => {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}
  const args = message.content.split(" ").slice(1);
  const args2 = message.content.split(' ').slice(1).join(' ');
  
    try {
         var authors = [ "331616752767205378"];
    if(!authors.includes(message.author.id)) {
    message.channel.send({embed: embed});
    return;
    }
    
    if (!args2) {
      message.channel.send("What do you want me to evaluate?");
      return;
  }
  

        const code = args.join(" ");
      let evaled = eval(code);
      
                if (clean(evaled).includes(settings.token)) {
          message.delete()
          message.channel.send("That isnt a good idea cause it includes the bot token in it")
          return;
        }
                if (code.includes(settings.token)) {
                  message.delete()
          message.channel.send("That isnt a good idea cause it includes the bot token in it")
          return;
        }
        if (code.includes("process.env")) {
          message.delete()
          message.channel.send("Why would you wanna reveal our secrets?")
          return;
        }


      if (typeof evaled !== "string")	
        evaled = require("util").inspect(evaled);

        if (clean(evaled).length > 1024 || code.length > 1024) {
        hastebin(`Evaled: ${code}\n\nOutput: \n\n${clean(evaled)}`, "js").then(r => {
          var embed3 = new Discord.RichEmbed()
          .setTitle("Oops!")
          .setTimestamp()
          .setColor("#ffff66")
          .addField(":warning: I guess the eval was too much! :warning: \nI generated a hastebin link instead! Here you go!", r, true)
          message.channel.send({ embed: embed3 })
})} else {
        var embed2 = new Discord.RichEmbed()
        .setColor("#00ced1")
        .setDescription(`\`\`\`cpp\n"Evaluated"\n\`\`\`\n\`\`\`js\n${code}\n\`\`\`\n\n\`\`\`cs\n# Output\n\`\`\`\n\`\`\`js\n${clean(evaled)}\n\`\`\``)
        message.channel.send({embed : embed2 });
} 
    } catch (err) {
        const code = args.join(" ");
                if (clean(err).length > 1024 || code.length > 1024) {
        hastebin(`Evaled: ${code}\n\nError: \n\n${clean(err)}`, "js").then(r => {
          var embed3 = new Discord.RichEmbed()
          .setTitle("Oops!")
          .setTimestamp()
          .setColor("#f44242")
          .addField(":warning: I guess the eval was too much! It also errored! :warning: \nI generated a hastebin link instead! Here you go!", r, true)
          message.channel.send({ embed: embed3 })
})}
      var embed3 = new Discord.RichEmbed()
      .setTitle("ERROR:")
      .setColor("#f44242")
      .addField("Evaled: :inbox_tray:", `\`\`\`js\n${code}\n\`\`\``)
      .addField("Output: :outbox_tray:", `\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``)
      message.channel.send({embed: embed3 });
    }
}
	
  if(cmd === `${prefix}level`){
	  if(!xp[message.author.id]){
   xp[message.author.id] = {
     xp: 0,
     level: 1
  };
}
  let curxp = xp[message.author.id].xp;
  let curlvl = xp[message.author.id].level;
  let nxtLvlXp = curlvl * 300;
  let difference = nxtLvlXp - curxp;

  let lvlEmbed = new Discord.RichEmbed()
  .setAuthor(message.author.username)
  .setColor("RED")
  .addField("Level", curlvl, true)
  .addField("XP", curxp, true)
  .setFooter(`${difference} XP til level up`, message.author.displayAvatarURL);

  message.channel.send(lvlEmbed).then(msg => {msg.delete(5000)});

}


	  
  if(cmd === `${prefix}dmuser`){
	    var embedNoWork = new Discord.RichEmbed()
  .setTitle("Permission no ")
    .setColor("#f45f42")
  .addField("You don't have permission for run this command", "My developer only!")
    
    var authors = ["331616752767205378"];
    if(!authors.includes(message.author.id)) {
    message.channel.send({embed: embedNoWork});
    }
    
    let id = args[0];
	  
    let message = args.join(" ").slice(19);
    
    return bot.fetchUser(`${id}`).then(user => { user.send(`${message}`) })
}

  if(cmd === `${prefix}tableflip`){
        message.channel.send("(°-°)\\ ┬─┬").then(m => {
        setTimeout(() => {
            m.edit("(╯°□°)╯    ]").then(ms => {
                setTimeout(() => {
                    ms.edit("(╯°□°)╯  ︵  ┻━┻")
                }, 250)
            })
        }, 250);

    });
    
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
	
  if(cmd === `${prefix}clear`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) {
      let embed = new Discord.RichEmbed()
      .setDescription("You dont have permission for run this command")
      .setColor("#ce0e00")
      return message.channel.send(embed);
    }
    if(!args[0]) {
      let qembed = new Discord.RichEmbed()
      .setDescription("Plase give me the numbers!")
      .setColor("#ce0e00")
      return message.channel.send(qembed);
    }
    message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Cleared ${args[0]} messages!`).then(msg => msg.delete(2000));
  });

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
        return message.channel.send(qembed);
    }

    let rreason = args.join(" ").slice(22);
    if(!rreason) {
        let yembed = new Discord.RichEmbed()
        .setDescription("2. Plase give me the reason!")
        .setColor("#ce0e00")
        return message.channel.send(yembed)
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
        return message.channel.send(reportschannel)
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
    .addField("Total Members", message.guild.memberCount)
    .addField("Total Text Channels", `${message.guild.channels.filter(m => m.type === 'text').size}`)
    .addField("Total Voice Channel", `${message.guild.channels.filter(m => m.type === 'voice').size}`)
    .addField("Total Roles", `${message.guild.roles.size}`)
    .setTimestamp();

    return message.channel.send(serverembed);
  }

  if(cmd === `${prefix}botinfo`){

    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("Bot Information")
    .setColor("#15f153")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt)
    .addField("Owner", "<@331616752767205378>")
    .addField("Stats", `Usage **q!stats**`)

    return message.channel.send(botembed);
   }

  if(cmd === `${prefix}help`){
    let helpembed = new Discord.RichEmbed()
    .setDescription("**Moderation** \n • `ban` - banned the player! \n • `kick` - kicked the player! \n • `report` - report the player! \n • `say` - say with me! \n • `clear` - clear the messages!")
    .setTimestamp()
    .setColor("#09fa4c")
    message.channel.send(helpembed);

    let o = new Discord.RichEmbed()
    .setDescription("**Funny** \n • `8ball` - ask me somethings! \n • `smash` - smash somebody! \n • `tableflip` - flip a table! \n • `ascii` - turn text to ascii text! \n • `flip` - your text will be reversed! \n")
    .setColor("#98fc04")
    .setTimestamp()
    message.channel.send(o);

    let q = new Discord.RichEmbed()
    .setDescription("**Public** \n • `botinfo` - see information me! \n • `serverinfo` - see information of the server! \n • `support` - support me! \n • `ping` - see your ping's! \n • `avatar` - see your's avatar! \n • `weather` - See weather city")
    .setColor("#e9e203")
    .setTimestamp()
    message.channel.send(q);
	  
    let b = new Discord.RichEmbed()
    .setDescription("**Music** \n 	• `play` - Playing a music \n • `skip` - Skipping music \n • `stop` - Stop music \n • `pause` - Pause the music \n • `resume` - Resume the music \n • `volume (1 -> 5)` - Set volume audio \n • `queue` - See queue list \n • `np` - Now playing?")
    .setColor("#e9e203")
    .setTimestamp()
    return message.channel.send(b)
  }

		    
  if(cmd === `${prefix}say`){
	    message.delete();
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return errors.noPerms(message, "MANAGE_MESSAGES");
    let botmessage = args.join(" ");
    message.channel.send(botmessage);
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
	
  if(cmd === `${prefix}stats`){
    let uptimes = (Math.round(bot.uptime / (1000 * 60 * 60))) + " hours, " + (Math.round(bot.uptime / (1000 * 60)) % 60) + " minutes, and " + (Math.round(bot.uptime / 1000) % 60) + " seconds.\n";
    let cpu = process.cpuUsage().system / 1024 / 1024;
    let used = process.memoryUsage().heapUsed / 1024 / 1024;
    const _fs = require("fs");
    const package = JSON.parse(_fs.readFileSync('./package.json', 'utf-8'));

    let testembed = new Discord.RichEmbed()
    .setDescription("**STATS**")
    .setColor("#00fa3d")
    .addField(":open_file_folder: - Total Server", `${bot.guilds.size} Servers!`)
    .addField(":satellite: - Total Channels", `${bot.channels.size} Channels!`)
    .addField(":busts_in_silhouette: - Total Users", `${bot.users.size.toLocaleString()} Users!`)
    .addField(":bookmark: - Library", "Discord.js")
    .addField(":desktop: - Version", `${package.version}`)
    .addField(":floppy_disk: - CPU Usage", `${Math.round(cpu * 100) / 100}%`, true)
    .addField(":file_folder: - Memory Usage", `${Math.round(used * 100) / 100} MB`)
    .addField(":clock9: - Uptime", uptimes)
    .setTimestamp()

    message.channel.send(testembed);
  } 
  


});

 function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

bot.login(process.env.BOT_TOKEN);
