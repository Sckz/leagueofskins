const {Client, Intents, Collection, MessageEmbed, Message} = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]})
const prefix = "!"
const request = require('request');
var riotAPI = process.env.RIOTAPI
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
            msg.channel.send("**__Patch 12.10 :__**\n\nhttps://leagueskins.go.yj.fr/patch/12_10")
        }
        else if (args[1] == "12.11") {
            msg.channel.send("**__Patch 12.11 :__**\n\nhttps://leagueskins.go.yj.fr/patch/12_11")
        }
        else if (args[1] == "12.12") {
            msg.channel.send("**__Patch 12.12 :__**\n\nhttps://leagueskins.go.yj.fr/patch/12_12")
        }
        else {
            msg.channel.send("> Veuillez définir un patch valide (A partir de : 12.10)")
        }
    }
    else if (args[0] == "skins"){
        msg.channel.send("**__All 2022 Skins :__**\n\nhttps://leagueskins.go.yj.fr/skins/2022")
    }
    else if (args[0] == 'newpatch') {
        if (msg.author.id != "499977832961933342") return msg.channel.send("> **__Erreur :__** Commande indisponible");
        msg.delete()
        msg.channel.send(":page_facing_up:  **__Patch 12.11: __**\n\n__**Patch:**__ https://leagueskins.go.yj.fr/patch/12_11")
    }
    else if (args[0] == 'newskins') {
        if (msg.author.id != "499977832961933342") return msg.channel.send("> **__Erreur :__** Commande indisponible");
        msg.delete()
        msg.channel.send(':space_invader: **__Skins 12.12: __**\n\n**__Skins__** : https://leagueskins.go.yj.fr/\n\n`By KTS CORP`')
    }
})
client.on('messageCreate', async msg => {
    const args = msg.content.slice(prefix.length).split(/ +/);
    
    if (msg.content.startsWith(prefix + "lol")) {
        if (args[1] == "info") {
            var name = args.slice(2).join("+")
            if (!name) return msg.channel.send("> Veuillez entrer un nom.");
            request('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + "?api_key=" + riotAPI, function(error, response, body) {
            if (error) {
                console.log("Erreur :", error)
            }
            else {
                var imported = JSON.parse(body);
                if (imported.summonerLevel == undefined) return msg.channel.send("> Le joueur est introuvable")
                request(`https://euw1.api.riotgames.com/lol/league/v4/entries/by-summoner/${imported.id}?api_key=${riotAPI}`, function(error2, response2, body2) {
                    if (error2) {
                        console.log("Erreur:", error2)
                    }
                    else {
                        var imported2 = JSON.parse(body2)
                        var emoji = ""
                        var emoji2 = ""
                        var status = 0;
                        try {
                            imported2[1].queueType
                        } catch(error) {
                            status = 2
                        }
                        try {
                            imported2[0].queueType
                        }catch(error) {
                            status = 1
                        }

                        
                        if (status == 0) {
                            if (imported2[0].queueType == "RANKED_FLEX_SR" && imported2[1].queueType == "RANKED_SOLO_5x5") {
                                if (imported2[1].tier == "IRON") emoji = "<:Iron:983814517349838868>"
                                if (imported2[1].tier == "BRONZE") emoji = "<:Bronze:983814516905230366>"
                                if (imported2[1].tier == "SILVER") emoji = "<:Silver:983815028199280640>"
                                if (imported2[1].tier == "GOLD") emoji = "<:Gold:983814517177868390>"
                                if (imported2[1].tier == "PLATINUM") emoji = "<:Platine:983814517282701402>"
                                if (imported2[1].tier == "DIAMOND") emoji = "<:Diamond:983814516758413363>"
                                if (imported2[1].tier == "MASTER") emoji = "<:Master:983814517333049394>"
                                if (imported2[1].tier == "GRANDMASTER") emoji = "<:Grandmaster:983814517354033222>"
                                if (imported2[1].tier == "CHALLENGER") emoji = "<:Challenger:983814517089771620>"

                                if (imported2[0].tier == "IRON") emoji2 = "<:Iron:983814517349838868>"
                                if (imported2[0].tier == "BRONZE") emoji2 = "<:Bronze:983814516905230366>"
                                if (imported2[0].tier == "SILVER") emoji2 = "<:Silver:983815028199280640>"
                                if (imported2[0].tier == "GOLD") emoji2 = "<:Gold:983814517177868390>"
                                if (imported2[0].tier == "PLATINUM") emoji2 = "<:Platinum:983814517282701402>"
                                if (imported2[0].tier == "DIAMOND") emoji2 = "<:Diamond:983814516758413363>"
                                if (imported2[0].tier == "MASTER") emoji2 = "<:Master:983814517333049394>"
                                if (imported2[0].tier == "GRANDMASTER") emoji2 = "<:Grandmaster:983814517354033222>"
                                if (imported2[0].tier == "CHALLENGER") emoji2 = "<:Challenger:983814517089771620>"

                                var lol = new MessageEmbed()
                                 .setAuthor({name: `${imported.name}`, iconURL: ('http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/' + imported.profileIconId + '.png')})
                                 .setThumbnail('http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/' + imported.profileIconId + '.png')
                                 .setTitle("- __LoL Informations__ -")
                                 .addField("Niveau d'invocateur",`${imported.summonerLevel}`)
                                 .addField("Nom du compte :", `${imported.name}`)
                                 .addField("Ranked (Solo/Duo)", `${emoji} ${imported2[1].tier} ${imported2[1].rank} ${imported2[1].leaguePoints}LP`)
                                 .addField("Ranked (Flex)", `${emoji2} ${imported2[0].tier} ${imported2[0].rank} ${imported2[0].leaguePoints}LP`)
                                 .addField("Serveur :", "EUW")
                                 .setFooter({text: client.user.username})
                                 .setColor("BLURPLE")
                                msg.channel.send({embeds: [lol]})
                            }
                            if (imported2[0].queueType == "RANKED_SOLO_5x5" && imported2[1].queueType == "RANKED_FLEX_SR") {
                                if (imported2[1].tier == "IRON") emoji = "<:Iron:983814517349838868>"
                                if (imported2[1].tier == "BRONZE") emoji = "<:Bronze:983814516905230366>"
                                if (imported2[1].tier == "SILVER") emoji = "<:Silver:983815028199280640>"
                                if (imported2[1].tier == "GOLD") emoji = "<:Gold:983814517177868390>"
                                if (imported2[1].tier == "PLATINUM") emoji = "<:Platine:983814517282701402>"
                                if (imported2[1].tier == "DIAMOND") emoji = "<:Diamond:983814516758413363>"
                                if (imported2[1].tier == "MASTER") emoji = "<:Master:983814517333049394>"
                                if (imported2[1].tier == "GRANDMASTER") emoji = "<:Grandmaster:983814517354033222>"
                                if (imported2[1].tier == "CHALLENGER") emoji = "<:Challenger:983814517089771620>"

                                if (imported2[0].tier == "IRON") emoji2 = "<:Iron:983814517349838868>"
                                if (imported2[0].tier == "BRONZE") emoji2 = "<:Bronze:983814516905230366>"
                                if (imported2[0].tier == "SILVER") emoji2 = "<:Silver:983815028199280640>"
                                if (imported2[0].tier == "GOLD") emoji2 = "<:Gold:983814517177868390>"
                                if (imported2[0].tier == "PLATINUM") emoji2 = "<:Platinum:983814517282701402>"
                                if (imported2[0].tier == "DIAMOND") emoji2 = "<:Diamond:983814516758413363>"
                                if (imported2[0].tier == "MASTER") emoji2 = "<:Master:983814517333049394>"
                                if (imported2[0].tier == "GRANDMASTER") emoji2 = "<:Grandmaster:983814517354033222>"
                                if (imported2[0].tier == "CHALLENGER") emoji2 = "<:Challenger:983814517089771620>"

                                var lol = new MessageEmbed()
                                 .setAuthor({name: `${imported.name}`, iconURL: ('http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/' + imported.profileIconId + '.png')})
                                 .setThumbnail('http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/' + imported.profileIconId + '.png')
                                 .setTitle("- __LoL Informations__ -")
                                 .addField("Niveau d'invocateur",`${imported.summonerLevel}`)
                                 .addField("Nom du compte :", `${imported.name}`)
                                 .addField("Ranked (Solo/Duo)", `${emoji} ${imported2[0].tier} ${imported2[0].rank} ${imported2[0].leaguePoints}LP`)
                                 .addField("Ranked (Flex)", `${emoji2} ${imported2[1].tier} ${imported2[1].rank} ${imported2[1].leaguePoints}LP`)
                                 .addField("Serveur :", "EUW")
                                 .setFooter({text: client.user.username})
                                 .setColor("RANDOM")
                                msg.channel.send({embeds: [lol]})
                            }

                            
                        }
                        if (status == 1) {
                            let embed = new MessageEmbed()
                             .setAuthor({name: `${imported.name}`, iconURL: ('http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/' + imported.profileIconId + '.png')})
                             .setThumbnail('http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/' + imported.profileIconId + '.png')
                             .setTitle("- __LoL Informations__ -")
                             .addField("Niveau d'invocateur",`${imported.summonerLevel}`)
                             .addField("Nom du compte :", `${imported.name}`)
                             .addField("Ranked (Solo/Duo)", "Non classé")
                             .addField("Ranked (Flex)", `Non classé`)
                             .addField("Serveur :", "EUW")
                             .setFooter({text: client.user.username})
                             .setColor("RANDOM")
                            msg.channel.send({embeds: [embed]})
                        }
                        if (status == 2) {
                            if (imported2[0].queueType == "RANKED_SOLO_5x5") {
                                if (imported2[0].tier == "IRON") emoji2 = "<:Iron:983814517349838868>"
                                if (imported2[0].tier == "BRONZE") emoji2 = "<:Bronze:983814516905230366>"
                                if (imported2[0].tier == "SILVER") emoji2 = "<:Silver:983815028199280640>"
                                if (imported2[0].tier == "GOLD") emoji2 = "<:Gold:983814517177868390>"
                                if (imported2[0].tier == "PLATINUM") emoji2 = "<:Platinum:983814517282701402>"
                                if (imported2[0].tier == "DIAMOND") emoji2 = "<:Diamond:983814516758413363>"
                                if (imported2[0].tier == "MASTER") emoji2 = "<:Master:983814517333049394>"
                                if (imported2[0].tier == "GRANDMASTER") emoji2 = "<:Grandmaster:983814517354033222>"
                                if (imported2[0].tier == "CHALLENGER") emoji2 = "<:Challenger:983814517089771620>"
                                let embed = new MessageEmbed()
                                 .setAuthor({name: `${imported.name}`, iconURL: ('http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/' + imported.profileIconId + '.png')})
                                 .setThumbnail('http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/' + imported.profileIconId + '.png')
                                 .setTitle("- LoL Informations -")
                                 .addField("Niveau d'invocateur",`${imported.summonerLevel}`)
                                 .addField("Nom du compte :", `${imported.name}`)
                                 .addField("Ranked (Solo/Duo)", `${emoji2} ${imported2[0].tier} ${imported2[0].rank} ${imported2[0].leaguePoints}LP`)
                                 .addField("Ranked (Flex)", "Non classé")
                                 .addField("Serveur :", "EUW")
                                 .setFooter({text: client.user.username})
                                 .setColor("RANDOM")
                                msg.channel.send({embeds: [embed]})
                            }
                            if (imported2[0].queueType == "RANKED_FLEX_SR") {
                                if (imported2[0].tier == "IRON") emoji2 = "<:Iron:983814517349838868>"
                                if (imported2[0].tier == "BRONZE") emoji2 = "<:Bronze:983814516905230366>"
                                if (imported2[0].tier == "SILVER") emoji2 = "<:Silver:983815028199280640>"
                                if (imported2[0].tier == "GOLD") emoji2 = "<:Gold:983814517177868390>"
                                if (imported2[0].tier == "PLATINUM") emoji2 = "<:Platinum:983814517282701402>"
                                if (imported2[0].tier == "DIAMOND") emoji2 = "<:Diamond:983814516758413363>"
                                if (imported2[0].tier == "MASTER") emoji2 = "<:Master:983814517333049394>"
                                if (imported2[0].tier == "GRANDMASTER") emoji2 = "<:Grandmaster:983814517354033222>"
                                if (imported2[0].tier == "CHALLENGER") emoji2 = "<:Challenger:983814517089771620>"
                                let embed = new MessageEmbed()
                                 .setAuthor({name: `${imported.name}`, iconURL: ('http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/' + imported.profileIconId + '.png')})
                                 .setThumbnail('http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/' + imported.profileIconId + '.png')
                                 .setTitle("- __LoL Informations__ -")
                                 .addField("Niveau d'invocateur",`${imported.summonerLevel}`)
                                 .addField("Nom du compte :", `${imported.name}`)
                                 .addField("Ranked (Solo/Duo)", `Non classé`)
                                 .addField("Ranked (Flex)", `${emoji2} ${imported2[0].tier} ${imported2[0].rank} ${imported2[0].leaguePoints}LP`)
                                 .addField("Serveur :", "EUW")
                                 .setFooter({text: client.user.username})
                                 .setColor("RANDOM")
                                msg.channel.send({embeds: [embed]})
                            }
                        }
                        
                    }
                })
            }
        })
        }
        if (args[1] == "mastery") {
            var name = args.slice(3).join("+")
            var champion = args[2]
            if (!name) return msg.channel.send("> Vous devez rentrer un pseudo !");
            if (!champion) return msg.channel.send("> Vous devez préciser un champion.")

            request('https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/' + name + "?api_key=" + riotAPI, function(error, response, body) {
            if (error) {
                console.log("Erreur :", error)
            }
            else {
                var imported = JSON.parse(body)
                request('http://ddragon.leagueoflegends.com/cdn/12.11.1/data/en_US/champion.json', function(error2, response2, body2) {
                    if (error2) {
                        console.log("Erreur :", error2)
                    }
                    else {
                        var imported2 = JSON.parse(body2)
                        var list  = imported2['data']
                        function getChampionId(name) {
                            for (championName in list) {
                                if (list[championName]['id'] == name) {
                                    return list[name]['key'];
                                }
                                return 0
                            }
                        }
                        request(`https://euw1.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${imported.id}/by-champion/${getChampionId(champion)}?api_key=${riotAPI}`, function (error3, response3, body3) {
                            if (error3) {
                                console.log("Erreur : ", error3)
                            }
                            else {
                                var imported3 = JSON.parse(body3);
                                if (imported3.championLevel == undefined) return msg.channel.send("> Le champion ou le joueur est introuvable")
                                var emoji = ""
                                var chest = "Inconnu"
                                if (imported3.chestGranted) {
                                    chest = "Oui"
                                }else {
                                    chest = "Non"
                                }

                                if (imported3.championLevel == 1) emoji = "<:M1:984514838199926784>"
                                if (imported3.championLevel == 2) emoji = "<:M2:984514837973442651>"
                                if (imported3.championLevel == 3) emoji = "<:M3:984514837927329792>"
                                if (imported3.championLevel == 4) emoji = "<:M4:984514838279618640>"
                                if (imported3.championLevel == 5) emoji = "<:M5:984514838627754016>"
                                if (imported3.championLevel == 6) emoji = "<:M6:984514838581624972>"
                                if (imported3.championLevel == 7) emoji = "<:M7:984514838606774343>"

                                let embed = new MessageEmbed()
                                 .setAuthor({name: imported.name, iconURL: `http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/${imported.profileIconId}.png`})
                                 .setTitle("- __LoL Champion Maîtrise__ -")
                                 .addField("Champion :", `${champion}`)
                                 .addField("Niveau de maîtrise :", `${emoji} Maîtrise ${imported3.championLevel}`)
                                 .addField("Points : ", `${imported3.championPoints}`)
                                 .addField("Coffre : ", `${chest}`)
                                 .setColor('RANDOM')
                                 .setThumbnail(`http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/${imported.profileIconId}.png`)
                                 .setFooter({text: client.user.username})
                                
                                msg.channel.send({embeds: [embed]})
                            }
                        })
                    }
                })
            }
        })
        }
    }
});
client.on('messageCreate', msg => {
    const args = msg.content.slice(prefix.length).split(/ +/);
    
    if (msg.content.startsWith(prefix + "tft")) {
        if (args[1] == "info") {
            var name = args.slice(2).join("+")
            if (!name) return msg.channel.send("> Veuillez entrer un nom.");
            request(`https://euw1.api.riotgames.com/tft/summoner/v1/summoners/by-name/${name}?api_key=${riotAPI}`, function(error, response, body) {
                if (error) {
                    console.log('Erreur', error)
                }
                else{
                    var imported = JSON.parse(body)
                    var summonerId = imported.id
                    if (summonerId == undefined) return msg.channel.send("> Ce joueur est introuvable.")
                    request(`https://euw1.api.riotgames.com/tft/league/v1/entries/by-summoner/${summonerId}?api_key=${riotAPI}`,function(error2, response2, body2) {
                        if (error2) console.log("Erreur : ", error2)
                        else {
                            var imported2 = JSON.parse(body2)  
                            var emoji2 = ""

                            if (imported2[0].tier == "IRON") emoji2 = "<:Iron:983814517349838868>"
                            if (imported2[0].tier == "BRONZE") emoji2 = "<:Bronze:983814516905230366>"
                            if (imported2[0].tier == "SILVER") emoji2 = "<:Silver:983815028199280640>"
                            if (imported2[0].tier == "GOLD") emoji2 = "<:Gold:983814517177868390>"
                            if (imported2[0].tier == "PLATINUM") emoji2 = "<:Platinum:983814517282701402>"
                            if (imported2[0].tier == "DIAMOND") emoji2 = "<:Diamond:983814516758413363>"
                            if (imported2[0].tier == "MASTER") emoji2 = "<:Master:983814517333049394>"
                            if (imported2[0].tier == "GRANDMASTER") emoji2 = "<:Grandmaster:983814517354033222>"
                            if (imported2[0].tier == "CHALLENGER") emoji2 = "<:Challenger:983814517089771620>"

                            var lol = new MessageEmbed()
                            .setAuthor({name: `${imported2[0].summonerName}`})
                            .setTitle("- __TFT Informations__ -")
                            .setThumbnail('http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/' + imported.profileIconId + '.png')
                            .addField("Nom du compte :", `${imported2[0].summonerName}`)
                            .addField("Niveau d'invocateur :", `${imported.summonerLevel}`)
                            .addField("Ranked (Solo/Duo)", `${emoji2} ${imported2[0].tier} ${imported2[0].rank} ${imported2[0].leaguePoints}LP`)
                            .addField("Serveur :", "EUW")
                            .setFooter({text: client.user.username})
                            .setColor("RANDOM")
                            msg.channel.send({embeds: [lol]})
                        }
                    })
                }
            })
        }
    }
})
client.on('messageCreate', msg => {
    const args = msg.content.slice(prefix.length).split(/ +/);
    
    if (msg.content.startsWith(prefix + "valorant")) {
        if (msg.author.id != "499977832961933342") return msg.channel.send("> **__Erreur :__** Commande indisponible");
        if (args[1] == "info") {
            var name = args.slice(2).join("+")
            request()
        }
    }
})

client.on('messageCreate', msg => {
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    if (args[0] == "help") {
        let help1 = new MessageEmbed()
         .setAuthor({
             name: "Help - Page 1",
             iconURL: client.user.displayAvatarURL()
            })
         .setTitle('- __General__ -')
         .setDescription('`help` - List of commands\n`skins` - All 2022 Skins\n`patch <patch>` - League of Legends Patch note\n`site` - Site Web\n`event` - Event')
         .setColor("WHITE")
         .setFooter({text: client.user.username})

        let help2 = new MessageEmbed()
         .setAuthor({
            name: "Help - Page 2",
            iconURL: client.user.displayAvatarURL()
           })
         .setTitle('- __Riot__ -')
         .setDescription('`lol info <player name>` - Informations of a LoL Account\n`lol mastery <champion name> <player name>` - Champion mastery of a LoL Account\n`tft info <player name>` - Informations of a TFT Account.')
         .setColor("WHITE")
         .setFooter({text: client.user.username})

        msg.channel.send({embeds: [help1, help2]})
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
             .setTitle("🇫🇷 LFL - Jour 1 Semaine 3 🇫🇷")
             .setDescription('**__18h - Solary <:VS:981456373957165068> Misfits Premier __**\n\n*Votez en réagissant ci-dessous !*')
             .setColor("BLACK")
             .setTimestamp()
             .setFooter({text: client.user.username})
            let s1 = await msg.channel.send({embeds: [m1]})
            s1.react('<:SLY:981239640310829056>')
            s1.react('<:MSF:981239591153573959>')
             
            let m2 = new MessageEmbed()
             .setAuthor({
                 name: "LFL Event",
                 iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
            })
             .setTitle("🇫🇷 LFL - Jour 1 Semaine 3 🇫🇷")
             .setDescription('**__19h - Mirage-Elyandra <:VS:981456373957165068> Karmine Corp __**\n\n*Votez en réagissant ci-dessous !*')
             .setColor("WHITE")
             .setTimestamp()
             .setFooter({text: client.user.username})
            let s2 = await msg.channel.send({embeds: [m2]})
            s2.react('<:ELY:981239591031951450>')
            s2.react('<:KC:981239591166177320>')

            let m3 = new MessageEmbed()
             .setAuthor({
                 name: "LFL Event",
                 iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
            })
             .setTitle("🇫🇷 LFL - Jour 1 Semaine 3 🇫🇷")
             .setDescription('**__20h - Team GO <:VS:981456373957165068> LDLC OL __**\n\n*Votez en réagissant ci-dessous !*')
             .setColor("BLACK")
             .setTimestamp()
             .setFooter({text: client.user.username})
            let s3 = await msg.channel.send({embeds: [m3]})
            s3.react('<:GO:981239610002796624>')
            s3.react('<:LDLCOL:981239591027757056>')

            let m4 = new MessageEmbed()
            .setAuthor({
                name: "LFL Event",
                iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
           })
            .setTitle("🇫🇷 LFL - Jour 1 Semaine 3 🇫🇷")
            .setDescription('**__21h - Vitality.Bee <:VS:981456373957165068> GameWard __**\n\n*Votez en réagissant ci-dessous !*')
            .setColor("WHITE")
            .setTimestamp()
            .setFooter({text: client.user.username})
           let s4 = await msg.channel.send({embeds: [m4]})
           s4.react('<:VIT:981239650620416000>')
           s4.react('<:GW:981239591103266866>')
           

           let m5 = new MessageEmbed()
            .setAuthor({
                name: "LFL Event",
                iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
           })
            .setTitle("🇫🇷 LFL - Jour 1 Semaine 3 🇫🇷")
            .setDescription('**__22h - Team Oplon <:VS:981456373957165068> Team BDS Academy __**\n\n*Votez en réagissant ci-dessous !*')
            .setColor("BLACK")
            .setTimestamp()
            .setFooter({text: client.user.username})
           let s5 = await msg.channel.send({embeds: [m5]})
            s5.react('<:OPL:981239628361244733>')
            s5.react('<:BDSA:981239618882117732>')
        }
        if (args[1] == "day2") {
            if (msg.author.id != "499977832961933342") return msg.channel.send("> **__Erreur :__** Commande indisponible");
            msg.delete()
            let m1 = new MessageEmbed()
             .setAuthor({
                 name: "LFL Event",
                 iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
            })
             .setTitle("🇫🇷 LFL - Jour 2 Semaine 3 🇫🇷")
             .setDescription('**__18h - Team BDS Academy <:VS:981456373957165068> GameWard __**\n\n*Votez en réagissant ci-dessous !*')
             .setColor("BLACK")
             .setTimestamp()
             .setFooter({text: client.user.username})
            let s1 = await msg.channel.send({embeds: [m1]})
            s1.react('<:BDSA:981239618882117732>')
            s1.react('<:GW:981239591103266866>')
             
            let m2 = new MessageEmbed()
             .setAuthor({
                 name: "LFL Event",
                 iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
            })
             .setTitle("🇫🇷 LFL - Jour 2 Semaine 3 🇫🇷")
             .setDescription('**__19h - Team Oplon <:VS:981456373957165068> Mirage-Elyandra__**\n\n*Votez en réagissant ci-dessous !*')
             .setColor("WHITE")
             .setTimestamp()
             .setFooter({text: client.user.username})
            let s2 = await msg.channel.send({embeds: [m2]})
            s2.react('<:OPL:981239628361244733>')
            s2.react('<:ELY:981239591031951450>')
            

            let m3 = new MessageEmbed()
             .setAuthor({
                 name: "LFL Event",
                 iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
            })
             .setTitle("🇫🇷 LFL - Jour 2 Semaine 3 🇫🇷")
             .setDescription('**__20h - Solary <:VS:981456373957165068> Karmine Corp __**\n\n*Votez en réagissant ci-dessous !*')
             .setColor("BLACK")
             .setTimestamp()
             .setFooter({text: client.user.username})
            let s3 = await msg.channel.send({embeds: [m3]})
            s3.react('<:SLY:981239640310829056>')
            s3.react('<:KC:981239591166177320>')

            let m4 = new MessageEmbed()
            .setAuthor({
                name: "LFL  Event",
                iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
           })
            .setTitle("🇫🇷 LFL - Jour 2 Semaine 3 🇫🇷")
            .setDescription('**__21h - Vitality.Bee <:VS:981456373957165068> Team GO __**\n\n*Votez en réagissant ci-dessous !*')
            .setColor("WHITE")
            .setTimestamp()
            .setFooter({text: client.user.username})
           let s4 = await msg.channel.send({embeds: [m4]})
           s4.react('<:VIT:981239650620416000>')
           s4.react('<:GO:981239610002796624>')

           let m5 = new MessageEmbed()
            .setAuthor({
                name: "LFL Event",
                iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
           })
            .setTitle("🇫🇷 LFL - Jour 2 Semaine 3 🇫🇷")
            .setDescription('**__22h - Misfits Premier <:VS:981456373957165068> LDLC OL __**\n\n*Votez en réagissant ci-dessous !*')
            .setColor("BLACK")
            .setTimestamp()
            .setFooter({text: client.user.username})
           let s5 = await msg.channel.send({embeds: [m5]})
           s5.react('<:MSF:981239591153573959>')
           s5.react('<:LDLCOL:981239591027757056>')
           
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
