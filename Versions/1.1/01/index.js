const Discord = require("discord.js");
const pkg = require("./package.json");
const config = require("./config.json");
const bot = new Discord.Client();

var prefix = config.prefix;

//info embeds
const inf_Version = new Discord.RichEmbed().addField("current operating version:", pkg.version);
const inf_PrevVersion = new Discord.RichEmbed().addField("previous version:", pkg.previous);
const inf_Author = new Discord.RichEmbed().addField("bot author:", pkg.author);

bot.on("ready", () => {
    console.log("ready!");    
})

bot.on("message", msg => {
    if (!msg.content.startsWith(prefix)){
        return;
    }
    let args = msg.content.substring(prefix.length).split(" ");
    args[0] = args[0].toLowerCase();

    //ping command
    if (args[0] === "ping"){
        msg.channel.send("pong!");
    }
    //info command
    else if(args[0] === "info" || args[0] === "inf"){
        if (args[1] === "version" || args[1] === "v"){
            if (args[2] === "current"){
                msg.channel.send(inf_Version);
            }else if (args[2] === "previous" || args[2] === "prev"){
                msg.channel.send(inf_PrevVersion);
            }else{
                msg.channel.send("invalid input for argument #2.");
            }
        }else if (args[1] === "author"){
            msg.channel.send(inf_Author);
        }else if (args[1] === "users" || args[1] === "usercount" || args[1] === "userlist"){
            msg.channel.send(`> Total Users: ${msg.author.member.guild.memberCount}\n> Member Count: ${msg.author.member.guild.memberCount.filter(m => !m.bot).size}\n> Bot Count: ${msg.author.member.guild.memberCount.filter(m => m.bot).size}`)
        }
    }
    //bulk-delete command
    else if (args[0] === "bulkdel" || args[0] === "bulkdelete" || args[0] === "blkdel"){
        if (msg.member.roles.find(r => r.name === "MessageManager")){
            if (args[1] <= 50 && args[1] > 0){
                msg.channel.bulkDelete(args[1] + 1);
            }else{
                msg.channel.send("input out of bounds, must be between but not including 0 and 51.")
            }
        }else{
            msg.reply("invalid permissions");
        }
    }
})

bot.on("guildMemberAdd", member => {
    //welcome structure
    const welcomeChannel = member.guild.channels.find(channel => channel.name === "welcome");
    if (!welcomeChannel) return;
    welcomeChannel.send(`Welcome ${member}!\nto learn me, type:` + prefix + "info")
})

bot.on("guildMemberRemove", member => {
    /*
    if (member.guild.id !== serverStats.guildID) return;

    bot.channels.get(serverStats.totalUsersID).setName(`Total Users: ${member.guild.memberCount}`); //users
    bot.channels.get(serverStats.memberCountID).setName(`Member Count: ${member.guild.members.filter(m => !m.bot).size}`); //members
    bot.channels.get(serverStats.botCountID).setName(`Bot Count: ${member.guild.members.filter(m => m.bot).size}`); //bots
    */
})

bot.login(pkg.token);
