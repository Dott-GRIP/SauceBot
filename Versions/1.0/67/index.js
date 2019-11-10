const Discord = require("discord.js");
const bot = new Discord.Client();
const pkg = require("./package.json");

var prefix = "\\";

//info embeds
const inf_Version = new Discord.RichEmbed().addField("current operating version:", pkg.version);
const inf_Author = new Discord.RichEmbed().addField("bot author:", pkg.author);
const inf_PrevVersion = new Discord.RichEmbed().addField("previous version:", pkg.previous);

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
                //version lookup
                case "version" || "vers":
                    if (args[2]){
                        switch(args[2]){
                            case "current" || "cur":
                                msg.channel.send(inf_Version);
                                break;
                            case "previous" || "prev":
                                msg.channel.send(inf_PrevVersion);
                                break;
                        }
                    }else{
                        msg.channel.send(inf_Version);
                    }
                    break;
                //author check
                case "author":
                    msg.channel.send(inf_Author);
                    break;
            }
            break;
        case "bulkdel" || "bulkdelete" || "blkdel":
            if (msg.member.roles.find(r => r.name === "MessageManager")){
                if (args[1] <= 50 && args[1] > 0){
                    msg.channel.bulkDelete(args[1] + 1);
                }else{
                    msg.channel.send("input out of bounds, must be between but not including 0 and 51.")
                }
            }else{
                msg.reply("invalid permissions");
            }
            break;
    }
})

bot.login(pkg.token);
