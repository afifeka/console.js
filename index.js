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
  bot.user.setUsername("Quack");
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
  if(cmd === `${prefix}dm`){
    const DMatron = args.join(" ")
    if (!DMatron) return message.channel.send("**ERROR**\nYou did not include something you would like to DM me, please do!")
    message.author.send(DMatron)
    }
	
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
    .setDescription("**Public** \n • `botinfo` - see information me! \n • `serverinfo` - see information of the server! \n • `support` - support me! \n • `ping` - see your ping's! \n • `avatar` - see your's avatar!")
    .setColor("#e9e203")
    .setTimestamp()
    return message.channel.send(q);
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
  
      if(cmd === `${prefix}play`){
        const botsettings = require("./botconfig.json");
	const key = process.env.YOUTUBE_API_KEY
        const colors = require("colors");
        const moment = require("moment");
        const yt = require("ytdl-core");
        const YouTube = require("simple-youtube-api");
        const youtube = new YouTube(key);
        const opus = require("node-opus");
        const gyp = require("node-gyp");

        const args1 = message.content.split(' ');
        const searchString = args1.slice(1).join(' ');
        const url = args1[1] ? args1[1].replace(/<(.+)>/g, '$1') : '';
        const serverQueue = queue.get(message.guild.id);
      
      const voiceChannel = message.member.voiceChannel;
          if (!voiceChannel) return message.channel.send('I\'m sorry but you need to be in a voice channel to play music!');
          const permissions = voiceChannel.permissionsFor(bot.user);
          if (!permissions.has('CONNECT')) {
            return message.channel.send('I cannot connect to your voice channel, make sure I have the proper permissions!');
          } 
          if (!permissions.has('SPEAK')) {
            return message.channel.send('I cannot speak in this voice channel, make sure I have the proper permissions!');
          }
      
          if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
            const playlist = await youtube.getPlaylist(url);
            const videos = await playlist.getVideos();
            for (const video of Object.values(videos)) {
              const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
              await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
            }
            return message.channel.send(`✅ Playlist: **${playlist.title}** has been added to the queue!`);
          } else {
            try {
              var video = await youtube.getVideo(url);
            } catch (error) {
              try {
                var videos = await youtube.searchVideos(searchString, 10);
                let index = 0;
                
                
                const Embed2 = new Discord.RichEmbed()
                .setTitle(":musical_note: Song Selection :musical_note:")
                .setDescription(videos.map(video2 => `**${++index} -** ${video2.title}`).join('\n'))
                .setColor("#503d82")
                .setFooter("Please provide a value to select one of the search results ranging from 1-10.")
                
                
                let msgtoDelete = await message.channel.send({embed: Embed2});
                // eslint-disable-next-line max-depth
                try {
                  var response = await message.channel.awaitMessages(message2 => message2.content > 0 && message2.content < 11, {
                    maxMatches: 1,
                    time: 10000,
                    errors: ['time']
                  });
                  msgtoDelete.delete();
                } catch (err) {
                  console.error(err);
                  const noPick = new Discord.RichEmbed()
                  .setDescription("No or invalid value entered, cancelling video selection.")
                  .setColor("#503d82")
                  message.channel.send({embed: noPick});
                  msgtoDelete.delete()
                  return;
                }
                const videoIndex = parseInt(response.first().content);
                var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
              } catch (err) {
                console.error(err);
                return message.channel.send('🆘 I could not obtain any search results.');
              } 
            }
            return handleVideo(video, message, voiceChannel);
          }
      
          // Time for the functions
      
      async function handleVideo(video, message, voiceChannel, playlist = false) {
        const serverQueue = queue.get(message.guild.id);
        console.log(video);
        const song = {
          id: video.id,
          title: video.title,
          url: `https://www.youtube.com/watch?v=${video.id}`,
          durationh: video.duration.hours,
          durationm: video.duration.minutes,
          durations: video.duration.seconds,
        };
        if (!serverQueue) {
          const queueConstruct = { 
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            skippers: [],
            songs: [],
            volume: 5,
            playing: true
          };
          queue.set(message.guild.id, queueConstruct);
      
          queueConstruct.songs.push(song);
      
          try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            play(message.guild, queueConstruct.songs[0]);
          } catch (error) {
            console.error(`I could not join the voice channel: ${error}`);
            queue.delete(message.guild.id);
            return message.channel.send(`I could not join the voice channel: ${error}`);
          }
        } else {
          serverQueue.songs.push(song);
          console.log(serverQueue.songs);
          if (playlist) return undefined;
          else return message.channel.send(`✅ **${song.title}** has been added to the queue!`);
        }
        return undefined;
      }
      
      function play(guild, song) {
        const serverQueue = queue.get(guild.id);
      
        if (!song) {
          serverQueue.voiceChannel.leave();
          queue.delete(guild.id);
          return;
        }
        console.log(serverQueue.songs);
      
      const dispatcher = serverQueue.connection.playStream(yt(song.url))
              .on('end', reason => {
                  if (reason === 'Stream is not generating quickly enough.') console.log('Song ended.');
                  else console.log(reason);
                  serverQueue.songs.shift();
                  setTimeout(() => {
                      play(guild, serverQueue.songs[0]);
                  }, 250);
              })
              .on('error', error => console.error(error));
          dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
      
          //Modified playing messages that give you the song duration!
      
          let durations = song.durations - 1
        var secondslength = Math.log(durations) * Math.LOG10E + 1 | 0;
        var mlength = Math.log(song.durationm) * Math.LOG10E + 1 | 0;
        if(song.durationh !== 0) {
          if(secondslength == 1 || secondslength == 0) {
            if(mlength == 1 || mlength == 0) {
            return serverQueue.textChannel.send(`🎶 Now playing: **${song.title}** (${song.durationh}:0${song.durationm}:0${durations})`);
        }}}
        if(song.durationh !== 0) {
          if(secondslength == 1 || secondslength == 0) {
            if(mlength !== 1 || mlength !== 0) {
            return serverQueue.textChannel.send(`🎶 Now playing: **${song.title}** (${song.durationh}:${song.durationm}:0${durations})`);
          }}};
          if(song.durationh !== 0) {
            if(mlength == 1 || mlength == 0) {
              if(secondslength !== 1 || secondslength !== 0) {
              return serverQueue.textChannel.send(`🎶 Now playing: **${song.title}** (${song.durationh}:0${song.durationm}:${durations})`);
          }}}
          if(song.durationh !== 0) {
            if(mlength !== 1 || mlength !== 0) {
              if(secondslength !== 1 || secondslength !== 0) {
              return serverQueue.textChannel.send(`🎶 Now playing: **${song.title}** (${song.durationh}:${song.durationm}:${durations})`);
          }}}
          if(song.durationh == 0 && song.durationm !== 0) {
            if(secondslength == 1 || secondslength == 0) {
              return serverQueue.textChannel.send(`🎶 Now playing: **${song.title}** (${song.durationm}:0${durations})`);
          }}
          if(song.durationh == 0 && song.durationm !== 0) {
            if(secondslength !== 1 || secondslength !== 0) {
              return serverQueue.textChannel.send(`🎶 Now playing: **${song.title}** (${song.durationm}:${durations})`);
          }}
          if(song.durationh == 0 && song.durationm == 0 && song.durations !== 0) {
            return serverQueue.textChannel.send(`🎶 Now playing: **${song.title}** (${durations} Seconds)`);
          } else {
            return serverQueue.textChannel.send(`🎶 Now playing: **${song.title}**`);
          }
      }
          
          
          
          
          
    } // I had this setup somewhere else so if u see me paste something in that's why
      


});

bot.login(process.env.BOT_TOKEN);
