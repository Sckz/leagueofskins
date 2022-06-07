const {Client, Intents, Collection, MessageEmbed} = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]})
const prefix = "!"
const request = require('request');
var riotAPI = "RGAPI-e6653989-3a56-4cb0-ae33-70c15a244a8a";
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
            msg.channel.send("> Ce patch n'est pas encore publique.")
        }
        else {
            msg.channel.send("> Veuillez définir un patch valide (A partir de : 12.10)")
        }
    }
    else if (args[0] == "skins"){
        msg.channel.send("**__All 2022 Skins :__**\n\nhttps://leagueskins.go.yj.fr/skins/2022.html")
    }
    else if (args[0] == 'newpatch') {
        if (msg.author.id != "499977832961933342") return msg.channel.send("> **__Erreur :__** Commande indisponible");
        msg.delete()
        msg.channel.send(":page_facing_up:  **__Patch 12.11: __**\n\n__**Patch:**__ https://leagueskins.go.yj.fr/patch/12_11.html")
    }
    else if (args[0] == 'newskins') {
        if (msg.author.id != "499977832961933342") return msg.channel.send("> **__Erreur :__** Commande indisponible");
        msg.delete()
        msg.channel.send(':space_invader: **__Skins 12.12: __**\n\n**__Skins__** : https://leagueskins.go.yj.fr/\n\n`By KTS CORP`')
    }
})
client.on('messageCreate', async msg => {
    const args = msg.content.slice(prefix.length).split(/ +/);
    var name = args.slice(1).join("+")
    if (msg.content.startsWith(prefix + "lol")) {
        if (msg.author.id != "499977832961933342") return msg.channel.send("> **__Erreur :__** Commande indisponible");
        if (!name) return msg.channel.send("> Veuillez entrer un nom.");

        request('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + "?api_key=" + riotAPI, function(error, response, body) {
            if (error) {
                console.log("Erreur :", error)
            }
            else {
                var imported = JSON.parse(body);
                request(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${imported.id}?api_key=${riotAPI}`, function(error2, response2, body2) {
                    if (error2) {
                        console.log("Erreur:", error2)
                    }
                    else {
                        var imported2 = JSON.parse(body2)
                        var status = 0;
                        try {
                            imported2[1].tier
                        }catch(error) {
                            status = 1
                            try {
                                imported2[0].tier
                            }catch(error){
                                status = 2
                            }
                        }
                        try {
                            var lp = imported2[0].leaguePoints
                        }catch(error) {
                            lp = 0;
                        }
                        var emoji = ""
                        var emoji2 = ""
                        if (status == 0) {
                            if (imported2[1].tier == "IRON") emoji = "<:Iron:983715859107295253>"
                            if (imported2[1].tier == "BRONZE") emoji = "<:Bronze:983716260359594034>"
                            if (imported2[1].tier == "SILVER") emoji = "<:Silver:983714816973766656>"
                            if (imported2[1].tier == "GOLD") emoji = "<:Gold:983715909900308480>"
                            if (imported2[1].tier == "PLATINUM") emoji == "<:Platine:983716966940442746>"
                            if (imported2[1].tier == "DIAMOND") emoji == "<:Diamand:983717001560199218>"
                            if (imported2[1].tier == "MASTER") emoji == "<:Master:983716966793637908>"
                            if (imported2[1].tier == "GRANDMASTER") emoji == "<:Grandmaster:983716982350307368>"
                            if (imported2[1].tier == "CHALLENGER") emoji == "<:Challenger:983717001723805766>"

                            if (imported2[0].tier == "IRON") emoji2 = "<:Iron:983716260359594034>"
                            if (imported2[0].tier == "BRONZE") emoji2 = "<:Bronze:983716260359594034>"
                            if (imported2[0].tier == "SILVER") emoji2 = "<:Silver:983714816973766656>"
                            if (imported2[0].tier == "GOLD") emoji2 = "<:Gold:983716059330785350>"
                            if (imported2[0].tier == "PLATINUM") emoji2 == "<:Platine:983717102848458763>"
                            if (imported2[0].tier == "DIAMOND") emoji2 == "<:Diamand:983717444155744356>"
                            if (imported2[0].tier == "MASTER") emoji2 == "<:Master:983717626679283734>"
                            if (imported2[0].tier == "GRANDMASTER") emoji2 == "<:Grandmaster:983717779490340944>"
                            if (imported2[0].tier == "CHALLENGER") emoji2 == "<:Challenger:983717925733142568>"

                            var lol = new MessageEmbed()
                            .setAuthor({name: `${imported.name}`, iconURL: ('http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/' + imported.profileIconId + '.png')})
                            .setThumbnail('http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/' + imported.profileIconId + '.png')
                            .addField("Ranked (Solo/Duo)", `${emoji} ${imported2[1].tier} ${imported2[1].rank} ${imported2[1].leaguePoints}LP`)
                            .addField("Ranked (Flex)", `${emoji2} ${imported2[0].tier} ${imported2[0].rank} ${lp}LP`)
                            .addField("Niveau d'invocateur",`${imported.summonerLevel}`)
                            .addField("Nom du compte :", `${imported.name}`)
                            .addField("Serveur :", "EUW")
                            .setColor("BLURPLE")
                            msg.channel.send({embeds: [lol]})
                        }
                        if (status == 1) {
                            let embed = new MessageEmbed()
                             .setAuthor({name: `${imported.name}`, iconURL: ('http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/' + imported.profileIconId + '.png')})
                             .setThumbnail('http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/' + imported.profileIconId + '.png')
                             .addField("Ranked (Solo/Duo)", "Inconnu/Non classé")
                             .addField("Ranked (Flex)", `${imported2[0].tier} ${imported2[0].rank} ${lp}LP`)
                             .addField("Niveau d'invocateur",`${imported.summonerLevel}`)
                             .addField("Nom du compte :", `${imported.name}`)
                             .addField("Serveur :", "EUW")
                             .setColor("BLURPLE")
                            msg.channel.send({embeds: [embed]})
                        }
                        if (status == 2) {
                            let embed = new MessageEmbed()
                             .setAuthor({name: `${imported.name}`, iconURL: ('http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/' + imported.profileIconId + '.png')})
                             .setThumbnail('http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/' + imported.profileIconId + '.png')
                             .addField("Ranked (Solo/Duo)", "Inconnu/Non classé")
                             .addField("Ranked (Flex)", "Inconnu/Non classé")
                             .addField("Niveau d'invocateur",`${imported.summonerLevel}`)
                             .addField("Nom du compte :", `${imported.name}`)
                             .addField("Serveur :", "EUW")
                             .setColor("BLURPLE")
                            msg.channel.send({embeds: [embed]})
                        }
                        
                    }
                })
            }
        })
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
         .setDescription('`help` - List of commands\n`skins` - All 2022 Skins\n`patch` - League of Legends Patch note (Usage : `!patch <name of patch>`) \n`site` - Site Web\n`event` - Event')
         .setColor("WHITE")
         .setFooter({text: client.user.username})
        msg.channel.send({embeds: [embed]})
    }
})
client.on('messageCreate', async msg => {
    const args = msg.content.slice(prefix.length).trim().split(/ +/g)
    if (args[0] == "event") {
        if (args[1] == "bc") {
            if (msg.author.id != "499977832961933342") return msg.channel.send("> **__Erreur :__** Commande indisponible");
            let bc = new MessageEmbed()
             .setAuthor({
                 name: "Broadcast"})
             .setTitle("Saison 2")
             .setDescription("Bienvenue sur le salon des patch-note **LeagueOfLegends Saison 2** de ce serveur.\n\n**__Qu'est-ce que change la saison 2 ? :__**\nMaintenant, tous les **Mardi** entre **18h et 18h30**, il y aura une mise à jour du site, du bot et il y aura les nouveaux patch sur ce channel. Nous commençons par un nouveau patch, des nouveaux skins et DES nouvelles commandes ! Les nouvelles commandes sont `!patch <patch>` et `!skins` ! Tapez la commande `!help` pour plus d'informations.\n\nA bientôt pour plus de nouveautées")
             .setColor("RED")
             .setTimestamp()
             .setFooter({text: client.user.username})
            msg.channel.send({embeds: [bc]})
        }
        if (args[1] == "day1") {
            if (msg.author.id != "499977832961933342") return msg.channel.send("> **__Erreur :__** Commande indisponible");
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
            if (msg.author.id != "499977832961933342") return msg.channel.send("> **__Erreur :__** Commande indisponible");
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
            if (msg.author.id != "499977832961933342") return msg.channel.send("> **__Erreur :__** Commande indisponible");
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
            msg.channel.send("**__Points:__**\n\nhttps://leagueskins.go.yj.fr/event/points.html")
        }
    }
})

client.login(process.env.TOKEN)
