const {Client, Intents, Collection, MessageEmbed} = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]})
const prefix = "!"
let axios = require('axios').default
let riotAPI = "RGAPI-b949ce8d-8f32-4a8a-bc4b-dc24a511e252";
var cpt = 0

client.on('ready', () => {
    console.log('Bot Status : ON')
    client.user.setStatus('online');
    client.user.setActivity('League of Legends', {
        type: "PLAYING"
    })
})

client.on('messageCreate', async (msg) => {
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    if (args[0] == "site") {
        msg.channel.send('__**Website :**__\n\nhttps://leagueskins.go.yj.fr/')
    }
    else if (args[0] == "patch") {
        if (args[1] == "12.10") {
            msg.channel.send("**__Patch 12.10 :__**\n\nhttps://leagueskins.go.yj.fr/patch/12_10.html")
        }
        else if (args[1] == "12.11") {
            msg.channel.send("**__Patch 12.11 :__**\n\nhttps://leagueskins.go.yj.fr/patch/12_11.html")
        }
        else if (args[1] == "12.12") {
            msg.channel.send("Patch inexistant")
        }
        else {
            msg.channel.send("> Veuillez définir un patch valide (A partir de : 12.10)")
        }
    }
    else if (args[0] == "skins"){
        msg.channel.send("**__All 2022 Skins :__**\n\nhttps://leagueskins.go.yj.fr/skins/2022.html")
    }
    else if (args[0] == 'newpatch') {
        msg.delete()
        msg.channel.send(":page_facing_up:  **__Patch 12.11: __**\n\n__**Patch:**__ https://leagueskins.go.yj.fr/patch/12_11.html")
    }
    else if (args[0] == 'newskins') {
        msg.delete()
        msg.channel.send(':space_invader: **__Skins 12.12: __**\n\n**__Skins__** : https://leagueskins.go.yj.fr/\n\n`By KTS CORP`')
    }
})
client.on('messageCreate', async msg => {
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    var name = args[1]
    if (args[0] == "lol") {
        if (!name) return msg.channel.send("> Veuillez entrer un nom.");

        const profile = await axios.get('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + "?api_key=" + riotAPI)
        let embed = new MessageEmbed()
         .setAuthor({name: name, iconURL: ('http://ddragon.leagueoflegends.com/cdn/11.4.1/img/profileicon/' + profile.data.profileIconId + '.png')})
         .setThumbnail('http://ddragon.leagueoflegends.com/cdn/11.4.1/img/profileicon/' + profile.data.profileIsconId + '.png')
         .addField("Niveau d'invocateur", profile.data.summonerLevel)
         .addField("Indentifiant du compte", profile.data.id)
         .addField("Nom du compte :", name)
         .addField("Serveur :", "EUW")
         .setColor("BLURPLE")
        msg.channel.send("> Cette commande est en maintenance ⛔")
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
         .setDescription('`help` - List of commands\n`skins` - All 2022 Skins\n`patch` - Last Patch\n`site` - Site Web\n`!event` - Event')
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
                 name: "LFL Event",
                 iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
            })
             .setTitle("🇫🇷 LFL - Jour 1 Semaine 2 🇫🇷")
             .setDescription('**__18h - Team Oplon <:VS:981456373957165068> GW__**\n\n*Votez en réagissant ci-dessous !*')
             .setColor("BLACK")
             .setTimestamp()
             .setFooter({text: client.user.username})
            let s1 = await msg.channel.send({embeds: [m1]})
            s1.react('<:OPL:981239628361244733>')
            s1.react('<:GW:981239591103266866>')
             
            let m2 = new MessageEmbed()
             .setAuthor({
                 name: "LFL Event",
                 iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
            })
             .setTitle("🇫🇷 LFL - Jour 1 Semaine 2 🇫🇷")
             .setDescription('**__19h - Mirage-Elyandra <:VS:981456373957165068> LDLCOL__**\n\n*Votez en réagissant ci-dessous !*')
             .setColor("WHITE")
             .setTimestamp()
             .setFooter({text: client.user.username})
            let s2 = await msg.channel.send({embeds: [m2]})
            s2.react('<:ELY:981239591031951450>')
            s2.react('<:LDLCOL:981239591027757056>')

            let m3 = new MessageEmbed()
             .setAuthor({
                 name: "LFL Event",
                 iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
            })
             .setTitle("🇫🇷 LFL - Jour 1 Semaine 2 🇫🇷")
             .setDescription('**__20h - Team GO <:VS:981456373957165068> Karmine Corp__**\n\n*Votez en réagissant ci-dessous !*')
             .setColor("BLACK")
             .setTimestamp()
             .setFooter({text: client.user.username})
            let s3 = await msg.channel.send({embeds: [m3]})
            s3.react('<:GO:981239610002796624>')
            s3.react('<:KC:981239591166177320>')

            let m4 = new MessageEmbed()
            .setAuthor({
                name: "LFL Event",
                iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
           })
            .setTitle("🇫🇷 LFL - Jour 1 Semaine 2 🇫🇷")
            .setDescription('**__21h - Vitality.Bee <:VS:981456373957165068> Misfits Premier__**\n\n*Votez en réagissant ci-dessous !*')
            .setColor("WHITE")
            .setTimestamp()
            .setFooter({text: client.user.username})
           let s4 = await msg.channel.send({embeds: [m4]})
           s4.react('<:VIT:981239650620416000>')
           s4.react('<:MSF:981239591153573959>')
           

           let m5 = new MessageEmbed()
            .setAuthor({
                name: "LFL Event",
                iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
           })
            .setTitle("🇫🇷 LFL - Jour 1 Semaine 2 🇫🇷")
            .setDescription('**__22h - Team BDS Academy <:VS:981456373957165068> Solary __**\n\n*Votez en réagissant ci-dessous !*')
            .setColor("BLACK")
            .setTimestamp()
            .setFooter({text: client.user.username})
           let s5 = await msg.channel.send({embeds: [m5]})
           s5.react('<:BDSA:981239618882117732>')
           s5.react('<:SLY:981239640310829056>')
        }
        if (args[1] == "day2") {
            msg.delete()
            let m1 = new MessageEmbed()
             .setAuthor({
                 name: "LFL Event",
                 iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
            })
             .setTitle("🇫🇷 LFL - Jour 2 Semaine 2 🇫🇷")
             .setDescription('**__18h - Vitality.Bee <:VS:981456373957165068> Team Oplon__**\n\n*Votez en réagissant ci-dessous !*')
             .setColor("BLACK")
             .setTimestamp()
             .setFooter({text: client.user.username})
            let s1 = await msg.channel.send({embeds: [m1]})
            s1.react('<:VIT:981239650620416000>')
            s1.react('<:OPL:981239628361244733>')

             
            let m2 = new MessageEmbed()
             .setAuthor({
                 name: "LFL Event",
                 iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
            })
             .setTitle("🇫🇷 LFL - Jour 2 Semaine 2 🇫🇷")
             .setDescription('**__19h - Misfits Premier <:VS:981456373957165068> Mirage-Elyandra__**\n\n*Votez en réagissant ci-dessous !*')
             .setColor("WHITE")
             .setTimestamp()
             .setFooter({text: client.user.username})
            let s2 = await msg.channel.send({embeds: [m2]})
            s2.react('<:MSF:981239591153573959>')
            s2.react('<:ELY:981239591031951450>')
            

            let m3 = new MessageEmbed()
             .setAuthor({
                 name: "LFL Event",
                 iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
            })
             .setTitle("🇫🇷 LFL - Jour 2 Semaine 2 🇫🇷")
             .setDescription('**__20h - Solary <:VS:981456373957165068> LDLC OL __**\n\n*Votez en réagissant ci-dessous !*')
             .setColor("BLACK")
             .setTimestamp()
             .setFooter({text: client.user.username})
            let s3 = await msg.channel.send({embeds: [m3]})
            s3.react('<:SLY:981239640310829056>')
            s3.react('<:LDLCOL:981239591027757056>')

            let m4 = new MessageEmbed()
            .setAuthor({
                name: "LFL  Event",
                iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
           })
            .setTitle("🇫🇷 LFL - Jour 2 Semaine 2 🇫🇷")
            .setDescription('**__21h - Team BDS Academy <:VS:981456373957165068> Karmine Corp __**\n\n*Votez en réagissant ci-dessous !*')
            .setColor("WHITE")
            .setTimestamp()
            .setFooter({text: client.user.username})
           let s4 = await msg.channel.send({embeds: [m4]})
           s4.react('<:BDSA:981239618882117732>')
           s4.react('<:KC:981239591166177320>')


           let m5 = new MessageEmbed()
            .setAuthor({
                name: "LFL Event",
                iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
           })
            .setTitle("🇫🇷 LFL - Jour 2 Semaine 2 🇫🇷")
            .setDescription('**__22h - Team GO <:VS:981456373957165068> GameWard__**\n\n*Votez en réagissant ci-dessous !*')
            .setColor("BLACK")
            .setTimestamp()
            .setFooter({text: client.user.username})
           let s5 = await msg.channel.send({embeds: [m5]})
           s5.react('<:GO:981239610002796624>')
           s5.react('<:GW:981239591103266866>')
           
        }
        else if (args[1] == "win") {
            cpt++;
            if (cpt > 5) { cpt = 1 }
            if (args[2] == "VITB") {
                msg.delete()
                let embed = new  MessageEmbed()
                 .setAuthor({
                     name: "LFL Event",
                     iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
                    })
                 .setTitle("🏆 Winner 🏆")
                 .setDescription(`**__Match ${cpt} :__**\n**Vitality.Bee <:VIT:981239650620416000>**`)
                 .setColor("GOLD")
                 .setTimestamp()
                 .setFooter({text: client.user.username})
                msg.channel.send({embeds: [embed]})
            }
            if (args[2] == "KC") {
                msg.delete()
                let embed = new MessageEmbed()
                 .setAuthor({
                    name: "LFL Event",
                    iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
                   })
                 .setTitle("🏆 Winner 🏆")
                 .setDescription(`**__Match ${cpt} :__**\n**Karmine Corp <:KC:981239591166177320>**`)
                 .setColor("GOLD")
                 .setTimestamp()
                 .setFooter({text: client.user.username})
               msg.channel.send({embeds: [embed]})
            }
            if (args[2] == "OPL") {
                msg.delete()
                let embed = new MessageEmbed()
                 .setAuthor({
                    name: "LFL Event",
                    iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
                   })
                 .setTitle("🏆 Winner 🏆")
                 .setDescription(`**__Match ${cpt} :__**\n**Team Oplon <:OPL:981239628361244733>**`)
                 .setColor("GOLD")
                 .setTimestamp()
                 .setFooter({text: client.user.username})
               msg.channel.send({embeds: [embed]})
            }
            if (args[2] == "SLY") {
                msg.delete()
                let embed = new MessageEmbed()
                 .setAuthor({
                    name: "LFL Event",
                    iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
                   })
                 .setTitle("🏆 Winner 🏆")
                 .setDescription(`**__Match ${cpt} :__**\n**Solary <:SLY:981239640310829056>**`)
                 .setColor("GOLD")
                 .setTimestamp()
                 .setFooter({text: client.user.username})
               msg.channel.send({embeds: [embed]})
            }
            if (args[2] == "LDLC") {
                msg.delete()
                let embed = new MessageEmbed()
                 .setAuthor({
                     name: "LFL Event",
                     iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
                 })
                 .setTitle("🏆 Winner 🏆")
                 .setDescription(`**__Match ${cpt} :__**\n**LDLC OL <:LDLCOL:981239591027757056>**`)
                 .setColor("GOLD")
                 .setTimestamp()
                 .setFooter({text: client.user.username})
                msg.channel.send({embeds: [embed]})
            }
            if (args[2] == "BDSA") {
                msg.delete()
                let embed = new MessageEmbed()
                 .setAuthor({
                     name: "LFL Event",
                     iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
                 })
                 .setTitle("🏆 Winner 🏆")
                 .setDescription(`**__Match ${cpt} :__**\n**Team BDS Academy <:BDSA:981239618882117732>**`)
                 .setColor("GOLD")
                 .setTimestamp()
                 .setFooter({text: client.user.username})
                msg.channel.send({embeds: [embed]})
            }
            if (args[2] == "ELY") {
                msg.delete()
                let embed = new MessageEmbed()
                 .setAuthor({
                     name: "LFL Event",
                     iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
                 })
                 .setTitle("🏆 Winner 🏆")
                 .setDescription(`**__Match ${cpt} :__**\n**Mirage-Elyandra <:ELY:981239591031951450>**`)
                 .setColor("GOLD")
                 .setTimestamp()
                 .setFooter({text: client.user.username})
                msg.channel.send({embeds: [embed]})
            }
            if (args[2] == "GO") {
                msg.delete()
                let embed = new MessageEmbed()
                 .setAuthor({
                     name: "LFL Event",
                     iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
                 })
                 .setTitle("🏆 Winner 🏆")
                 .setDescription(`**__Match ${cpt} :__**\n**Team GO <:GO:981239610002796624>**`)
                 .setColor("GOLD")
                 .setTimestamp()
                 .setFooter({text: client.user.username})
                msg.channel.send({embeds: [embed]})
            }
            if (args[2] == "GW") {
                msg.delete()
                let embed = new MessageEmbed()
                 .setAuthor({
                     name: "LFL Event",
                     iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
                 })
                 .setTitle("🏆 Winner 🏆")
                 .setDescription(`**__Match ${cpt} :__**\n**GameWard <:GW:981239591103266866>**`)
                 .setColor("GOLD")
                 .setTimestamp()
                 .setFooter({text: client.user.username})
                msg.channel.send({embeds: [embed]})
            }
            if (args[2] == "MSF") {
                msg.delete()
                let embed = new MessageEmbed()
                 .setAuthor({
                     name: "LFL Event",
                     iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
                 })
                 .setTitle("🏆 Winner 🏆")
                 .setDescription(`**__Match ${cpt} :__**\n**Misfits Premier <:MSF:981239591153573959>**`)
                 .setColor("GOLD")
                 .setTimestamp()
                 .setFooter({text: client.user.username})
                msg.channel.send({embeds: [embed]})
            }
            else if (!args[2]) {
                cpt--;
                msg.delete()
                msg.channel.send("Arguments : `MSF` | `GW` | `GO` | `KC` | `OPL` | `ELY` | `LDLC` | `SLY` | `VITB` | `BDSA` ")
            }
        }
        else if (!args[1]) {
            msg.channel.send("http://leagueskins.go.yj.fr/event/points.html")
        }
    }
})

client.login(process.env.TOKEN);
