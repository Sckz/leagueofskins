const {Client, Intents, Collection, MessageEmbed} = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]})
const prefix = "!"
let axios = require('axios');
let riotAPI = "RGAPI-ef565d89-e835-41d8-bfd4-7379db0ff1bd";


client.on('ready', () => {
    client.user.setStatus('online');
    client.user.setActivity('League of Legends', {
        type: "PLAYING"
    })
})

client.on('messageCreate', async (msg) => {
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    if (args[0] == "site") {
        msg.channel.send('__**Website :**__\n\nhttp://leagueskins.go.yj.fr/')
    }
    else if (args[0] == "patch") {
        if (args[1] == "12.10") {
            msg.channel.send("**__Patch 12.10 :__**\n\nhttp://leagueskins.go.yj.fr/patch/12_10.html")
        }
        else if (args[1] == "12.11") {
            msg.channel.send("**__Patch 12.11 :__**\n\nhttp://leagueskins.go.yj.fr/patch/12_11.html")
        }
        else {
            msg.channel.send("> Veuillez définir un patch valide (Exemple : 12.10)")
        }
    }
    else if (args[0] == "skins"){
        msg.channel.send("**__All 2022 Skins :__**\n\nhttp://leagueskins.go.yj.fr/skins/2022.html")
    }
    else if (args[0] == 'newpatch') {
        msg.delete()
        msg.channel.send(":page_facing_up:  **__Patch 12.10b: __**\n\n__**Patch:**__ http://leagueskins.go.yj.fr/patch/12_10b.html")
    }
    else if (args[0] == 'newskins') {
        msg.delete()
        msg.channel.send(':space_invader: **__Skins 12.10: __**\n\n**__Skins__** : http://leagueskins.go.yj.fr/\n\n`By KTS CORP`')
    }
    
})
client.on('messageCreate', msg => {
    const args = msg.content.slice(prefix.length).split(/ +/);
    var name = args.slice(1)
    if (msg.content.startsWith(prefix + "lol")) {
        if (!name) return msg.channel.send("Veuillez entrer un nom.");

        const profile = axios.get('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + "?api_key=" + riotAPI)
        let embed = new MessageEmbed()
         .setAuthor({name: name, iconURL: ('http://ddragon.leagueoflegends.com/cdn/11.4.1/img/profileicon/' + profile.data.profileIconId + '.png')})
         .setThumbnail('http://ddragon.leagueoflegends.com/cdn/11.4.1/img/profileicon/' + profile.data.profileIconId + '.png')
         .addField("Niveau d'invocateur", profile.data.summonerLevel)
         .addField("Indentifiant du compte", profile.data.id)
         .addField("Nom du compte :", name)
         .addField("Serveur :", "EUW")
         .setColor("BLURPLE")
        msg.channel.send("Error : Commande indisponible ou en maintenance")
    }
});
client.on('messageCreate', msg => {
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    if (args[0] == "help") {
        let embed = new MessageEmbed()
         .setAuthor({
             name: "Help",
             iconURL: client.user.displayAvatarURL()
            })
         .setDescription('`help` - List of commands\n`skins` - All 2022 Skins\n`patch` - Last Patch\n`site` - Site Web\n')
         .setColor("WHITE")
         .setFooter({text: client.user.username})
        msg.channel.send({embeds: [embed]})
    }
})

client.login(process.env.TOKEN);
