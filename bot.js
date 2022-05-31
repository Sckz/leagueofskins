const {Client, Intents, Collection, MessageEmbed} = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]})
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
client.on('messageCreate', async msg => {
    const args = msg.content.slice(prefix.length).trim().split(/ +/g)
    if (args[0] == "event") {
        if (args[1] == "rules") {
            let rules = new MessageEmbed()
             .setAuthor({
                 name: "Event",
                 iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
            })
             .setTitle("LFL - Event")
             .setDescription("Bienvenue sur le salon de l'événement **LFL** de ce serveur qui débutera dès le premier match sois le Mercredi 01 Juin.\n\n**__Comment ça marche ? :__**\nDans ce salon vont être postés les matchs. Vous aurez jusqu'à la fin de la Draft pour voter en réagissant sur les émojis en dessous. Celui qui a le plus de points gagne un role. Pour voir vos points il suffit de faire la commande `!event` et va vous renvoyer un lien vers la liste des points.\n\nBonne chance !")
             .setColor("RED")
             .setTimestamp()
             .setFooter({text: client.user.username})
            msg.channel.send({embeds: [rules]})
        }
        if (args[1] == "day1") {
            msg.delete()
            let m1 = new MessageEmbed()
             .setAuthor({
                 name: "Event",
                 iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
            })
             .setTitle("LFL - Jour 1 Semaine 1")
             .setDescription('**__18h - BDSA V/S LDLC OL__**\n\n*Votez en réagissant ci-dessous !*')
             .setColor("GOLD")
             .setTimestamp()
             .setFooter({text: client.user.username})
            let s1 = await msg.channel.send({embeds: [m1]})
             s1.react('<:BDSA:981239618882117732>')
             s1.react('<:LDLCOL:981239591027757056>')
             
            let m2 = new MessageEmbed()
             .setAuthor({
                 name: "Event",
                 iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
            })
             .setTitle("LFL - Jour 1 Semaine 1")
             .setDescription('**__19h - GO VS Solary__**\n\n*Votez en réagissant ci-dessous !*')
             .setColor("WHITE")
             .setTimestamp()
             .setFooter({text: client.user.username})
            let s2 = await msg.channel.send({embeds: [m2]})
            s2.react('<:GO:981239610002796624>')
            s2.react('<:SLY:981239640310829056>')

            let m3 = new MessageEmbed()
             .setAuthor({
                 name: "Event",
                 iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
            })
             .setTitle("LFL - Jour 1 Semaine 1")
             .setDescription('**__20h - Misfits Premier V/S GameWard__**\n\n*Votez en réagissant ci-dessous !*')
             .setColor("GOLD")
             .setTimestamp()
             .setFooter({text: client.user.username})
            let s3 = await msg.channel.send({embeds: [m3]})
            s3.react('<:MSF:981239591153573959>')
            s3.react('<:GW:981239591103266866>')

            let m4 = new MessageEmbed()
            .setAuthor({
                name: "Event",
                iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
           })
            .setTitle("LFL - Jour 1 Semaine 1")
            .setDescription('**__21h - Team Oplon VS Karmine Corp__**\n\n*Votez en réagissant ci-dessous !*')
            .setColor("WHITE")
            .setTimestamp()
            .setFooter({text: client.user.username})
           let s4 = await msg.channel.send({embeds: [m4]})
           s4.react('<:OPL:981239628361244733>')
           s4.react('<:KC:981239591166177320>')

           let m5 = new MessageEmbed()
            .setAuthor({
                name: "Event",
                iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
           })
            .setTitle("LFL - Jour 1 Semaine 1")
            .setDescription('**__22h - Vitality.Bee V/S Mirage-Elyandra__**\n\n*Votez en réagissant ci-dessous !*')
            .setColor("GOLD")
            .setTimestamp()
            .setFooter({text: client.user.username})
           let s5 = await msg.channel.send({embeds: [m5]})
           s5.react('<:VIT:981239650620416000>')
           s5.react('<:ELY:981239591031951450>')
        }
        else {
            msg.channel.send("http://leagueskins.go.yj.fr/event/points.html")
        }
    }
})

client.login(process.env.TOKEN);
