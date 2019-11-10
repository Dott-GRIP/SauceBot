const Discord = require("discord.js");
const bot = new Discord.Client();

const token = "TOKEN";
const pkg = require("./package.json");

var prefix = "\\";

//info embeds
const infoVersionEmbed = new Discord.RichEmbed().addField("current operating version:", pkg.version);
const infoAuthorEmbed = new Discord.RichEmbed().addField("bot author:", pkg.author);

bot.on("ready", () => {
    console.log("ready!");    
})

bot.on("message", msg => {
    let args = msg.content.substring(prefix.length).split(" ");
    args[0] = args[0].toLowerCase();

    switch(args[0]){
        case "ping":
            msg.channel.send("pong!");
            break;
        case "info" || "inf":
            switch(args[1]){
                case "version" || "vers":
                    msg.channel.send(infoVersionEmbed);
                    break;
                case "author":
                    msg.channel.send(infoAuthorEmbed);
                    break;
            }
            break;
        case "bulkdel" || "bulkdelete" || "blkdel":
            if (msg.member.roles.find(r => r.name === "MessageManager")){
                if (args[1] <= 50 && args[1] > 0){
                    msg.channel.bulkDelete(args[1] + 1);
                }else{
                    msg.channel.send("input out of bounds, must be between but not 0 and 51.")
                }
            }else{
                msg.reply("invalid permissions");
            }
            break;
    }
})

bot.login(token);
