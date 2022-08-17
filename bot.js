const {Client, Intents, Collection, MessageEmbed, Message, WebhookClient} = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]})
const prefix = "!";
const request = require('request');
var riotAPI = "";
var cpt = 0

client.on('ready', () => {
    console.log('Bot Status : ON')
    client.user.setStatus('online');
    client.user.setActivity('LFL - Vitality vs LDLC', {
        type: "STREAMING",
        url: "https://www.twitch.tv/otplol_"
    })
})

client.on('messageCreate', async (msg) => {
    const args = msg.content.slice(prefix.length).trim().split(/ +/g);
    if (args[0] == "site") {
        msg.channel.send('__**Website :**__\n\nhttps://leagueskins.go.yj.fr/')
    }
    if (args[0] == "invite") {
        msg.channel.send('__**Invite Bot :**__\n\nhttps://leagueskins.go.yj.fr/bot/invite')
    }
    else if (args[0] == "patch") {
        
        let p1 = "**__Patch 12.16 :__** https://leagueskins.go.yj.fr/patch/12-16"
        let p2 = "**__Patch 12.15 :__** https://leagueskins.go.yj.fr/patch/12-15"
        let p3 = "**__Patch 12.14 :__** https://leagueskins.go.yj.fr/patch/12-14"
        msg.channel.send(`${p1}\n\n${p2}\n\n${p3}`)

    }
    else if (args[0] == "skins"){
        msg.channel.send("**__All 2022 Skins :__**\n\nhttps://leagueskins.go.yj.fr/skins/2022")
    }
    else if (args[0] == 'newpatch') {
        if (msg.author.id != "499977832961933342") return msg.channel.send("> **__Erreur :__** Commande indisponible");
        msg.delete()
        msg.channel.send(":page_facing_up:  **__Patch 12.13: __**\n\n__**Patch:**__ https://leagueskins.go.yj.fr/patch/12-13")
    }
    else if (args[0] == 'newskins') {
        if (msg.author.id != "499977832961933342") return msg.channel.send("> **__Erreur :__** Commande indisponible");
        msg.delete()
        msg.channel.send(':space_invader: **__Skins 12.14: __**\n\n**__Skins__** : https://leagueskins.go.yj.fr/\n\n`By KTS CORP`')
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
            if (msg.author.id != "499977832961933342") return msg.channel.send("> **__Erreur :__** Commande en maintenance.");
            var name = args.slice(3).join("+")
            var champion = args[2]
            if (!name) return msg.channel.send("> Vous devez rentrer un pseudo !");
            if (!champion) return msg.channel.send("> Vous devez préciser un champion.")

            let lettre1 = champion[0]
            if (lettre1 == lettre1.toLowerCase()) { 
                champion = lettre1.toUpperCase() + champion.slice(1) 
                console.log(champion)
            }
            if (champion == "Kai'Sa" || champion == "Kai Sa") { champion = 'Kaisa'}
            if (champion == "Bel'Veth" || champion == "Bel Veth") {champion = 'Belveth'}


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
                            var status = 0
                            var emoji2 = ""

                            try{
                                imported2[0].tier
                            }catch(error){
                                status = 1
                            }

                            if (status == 0) {
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
                            if (status == 1) {
                                var lol = new MessageEmbed()
                                .setAuthor({name: `${imported.name}`})
                                .setTitle("- __TFT Informations__ -")
                                .setThumbnail('http://ddragon.leagueoflegends.com/cdn/12.10.1/img/profileicon/' + imported.profileIconId + '.png')
                                .addField("Nom du compte :", `${imported.name}`)
                                .addField("Niveau d'invocateur :", `${imported.summonerLevel}`)
                                .addField("Ranked (Solo/Duo)", `Non classé`)
                                .addField("Serveur :", "EUW")
                                .setFooter({text: client.user.username})
                                .setColor("RANDOM")
                                msg.channel.send({embeds: [lol]})
                            }
                            
                        }
                    })
                }
            })
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
        //Equipes
        let GW = '<:GW:981239591103266866>'
        let KC = '<:KC:981239591166177320>'
        let LDLC = '<:LDLCOL:981239591027757056>'
        let VIT = '<:VIT:981239650620416000>'
        let MSF = '<:MSF:981239591153573959>'
        let BDSA = '<:BDSA:981239618882117732>'
        //Dates
        let date1 = "Mercredi 10 Août"
        let date2 = "Jeudi 18 Août"
        //Ressources
        let Mountain = "<:Moutain:1002552161303015454>"
        let Hextech = "<:Hextech:1002552158153080973>"
        let Infernal = "<:Infernal:1002552159734333440>"
        let Cloud = "<:Cloud:1002552156286627880>"
        let Ocean = "<:Ocean:1002552163429519431>"

        if (args[1] == "rules") {
            let embed = new MessageEmbed()
             .setAuthor({
                name: "LFL - Event",
                iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
             })
             .setTitle("🇫🇷 LFL - Règles")
             .setDescription(`
             Bienvenue sur le salon de l'événement LFL.

            **__Fonctionnement :__**
             Dans ce salon vont être postés deux duels par semaine avec. Vous aurez jusqu'à la fin de la Draft pour voter pour l'équipe gagnante en réagissant sur les émojis en dessous. Celui qui a le plus de points gagne un role.
        
            **__Règles & autres fonctionnalités :__**
            - Fin des votes (Saison Régulière) : Les votes se terminent à la fin de la Draft.
            - Fin des votes (Play-Offs) : Tous les votes se terminent à la fin de la Draft et sont valables TOUTES les manches.
            - Vote : Vous pouvez que pour 1 choix de la catégorie. Dans le cas contraire, votre vote ne sera pas comptabilisé. 

            __Les fonctionnalités (Play-Offs uniquement) : Vous pouvez voter pour plusieurs fonctionnalités (Score, Drake...) :__
            - Les points sont attribués à chaque bonne réponse durant TOUTES les manches.

            Soyez stratégique !
             `)
            msg.channel.send({embeds: [embed]});
            
        }
        if (args[1] == "day1") {
            if (msg.author.id != "499977832961933342") return msg.channel.send("> **__Erreur :__** Commande indisponible");
            msg.delete()

            let m1 = new MessageEmbed()
            .setAuthor({
                name: `Play-Offs`,
                iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
           })
            .setTitle("🇫🇷 LFL - Match 7")
            .setDescription(`__**Date**__: ${date2} à 18h\n\n ${BDSA} **Team BDS Academy** <:VS:981456373957165068> **LDLC OL** ${LDLC}\n\n*Votez en réagissant ci-dessous !*`)
             .setColor("GOLD")
             .setImage('https://cdn.discordapp.com/attachments/879144621043752971/1009571237900599416/unknown.png')
             .setFooter({text: client.user.username})
             .setTimestamp(new Date(2022, 7, 18, 18, 0, 0))
            let s1 = await msg.channel.send({embeds: [m1]})
            s1.react(BDSA)
            s1.react(LDLC)

            let m10 = new MessageEmbed()
           .setAuthor({
            name: `Play-Offs`,
            iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
       })
        .setTitle("🇫🇷 LFL - Match 7")
        .setDescription(`__**Score**__:\n\n1️⃣ - ${BDSA} **3 - 0** ${LDLC}\n2️⃣ - ${BDSA} **3 - 1** ${LDLC}\n3️⃣ - ${BDSA} **3 - 2** ${LDLC}\n4️⃣ - ${BDSA} **0 - 3** ${LDLC}\n5️⃣ - ${BDSA} **1 - 3** ${LDLC}\n6️⃣ - ${BDSA} **2 - 3** ${LDLC}\n\n*Votez en réagissant ci-dessous !*`)
         .setColor("BLACK")
         .setFooter({text: client.user.username})
         .setTimestamp(new Date(2022, 7, 18, 18, 0, 0))
        let s10 = await msg.channel.send({embeds: [m10]})
        s10.react("1️⃣")
        s10.react("2️⃣")
        s10.react("3️⃣")
        s10.react("4️⃣")
        s10.react("5️⃣")
        s10.react("6️⃣")
             
            let m2 = new MessageEmbed()
            .setAuthor({
                name: `Play-Offs`,
                iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
           })
            .setTitle("🇫🇷 LFL - Match 7")
            .setDescription(`__**Âme du Dragon**__: \n\n**❌ Aucune**\n${Ocean} **Océan**\n${Infernal} **Infernale**\n${Mountain} **Montage** \n${Cloud} **Nuage** \n${Hextech} **Hextech** \n\n*Votez en réagissant ci-dessous !*`)
             .setColor("WHITE")
             .setImage('')
             .setFooter({text: client.user.username})
             .setTimestamp(new Date(2022, 7, 18, 18, 0, 0))
            let s2 = await msg.channel.send({embeds: [m2]})
            s2.react("❌")
            s2.react(Ocean)
            s2.react(Infernal)
            s2.react(Mountain)
            s2.react(Cloud)
            s2.react(Hextech)

            let m3 = new MessageEmbed()
            .setAuthor({
                name: `Play-Offs`,
                iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
           })
            .setTitle("🇫🇷 LFL - Match 7")
            .setDescription(`__**1e Dragon**__:\n\n ${BDSA} **Team BDS Academy**\n${LDLC} **LDLC OL**\n\n*Votez en réagissant ci-dessous !*`)
             .setColor("BLACK")
             .setFooter({text: client.user.username})
             .setTimestamp(new Date(2022, 7, 18, 18, 0, 0))
            let s3 = await msg.channel.send({embeds: [m3]})
            s3.react(BDSA)
            s3.react(LDLC)

            let m4 = new MessageEmbed()
            .setAuthor({
                name: `Play-Offs`,
                iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
           })
            .setTitle("🇫🇷 LFL - Match 7")
            .setDescription(`__**Dragons**__:\n\n ${BDSA} **Team BDS Academy**\n${LDLC} **LDLC OL**\n\n*Votez en réagissant ci-dessous !*`)
             .setColor("WHITE")
             .setFooter({text: client.user.username})
             .setTimestamp(new Date(2022, 7, 18, 18, 0, 0))
            let s4 = await msg.channel.send({embeds: [m4]})
            s4.react(BDSA)
            s4.react(LDLC)

           let m5 = new MessageEmbed()
           .setAuthor({
            name: `Play-Offs`,
            iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
       })
        .setTitle("🇫🇷 LFL - Match 7")
        .setDescription(`__**Nashor**__:\n\n $ ${BDSA} **Team BDS Academy**\n${LDLC} **LDLC OL**\n\n*Votez en réagissant ci-dessous !*`)
         .setColor("BLACK")
         .setFooter({text: client.user.username})
         .setTimestamp(new Date(2022, 7, 18, 18, 0, 0))
        let s5 = await msg.channel.send({embeds: [m5]})
        s5.react(BDSA)
        s5.react(LDLC)

        let m7 = new MessageEmbed()
           .setAuthor({
            name: `Play-Offs`,
            iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
       })
        .setTitle("🇫🇷 LFL - Match 7")
        .setDescription(`__**1e Tour**__:\n\n  ${BDSA} **Team BDS Academy**\n${LDLC} **LDLC OL**\n\n*Votez en réagissant ci-dessous !*`)
         .setColor("BLACK")
         .setFooter({text: client.user.username})
         .setTimestamp(new Date(2022, 7, 18, 18, 0, 0))
        let s7 = await msg.channel.send({embeds: [m7]})
        s7.react(BDSA)
        s7.react(LDLC)

        let m8 = new MessageEmbed()
           .setAuthor({
            name: `Play-Offs`,
            iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
       })
        .setTitle("🇫🇷 LFL - Match 6")
        .setDescription(`__**Herald**__:\n\n  ${VIT} **Vitality.Bee**\n${LDLC} **LDLC OL**\n\n*Votez en réagissant ci-dessous !*`)
         .setColor("WHITE")
         .setFooter({text: client.user.username})
         .setTimestamp(new Date(2022, 7, 17, 18, 0, 0))
        //let s8 = await msg.channel.send({embeds: [m8]})
        //s8.react(VIT)
        //s8.react(LDLC)

        let m9 = new MessageEmbed()
           .setAuthor({
            name: `Play-Offs`,
            iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
       })
        .setTitle("🇫🇷 LFL - Match 7")
        .setDescription(`__**1e Sang**__:\n\n  ${BDSA} **Team BDS Academy**\n${LDLC} **LDLC OL**\n\n*Votez en réagissant ci-dessous !*`)
         .setColor("BLACK")
         .setFooter({text: client.user.username})
         .setTimestamp(new Date(2022, 7, 18, 18, 0, 0))
        let s9 = await msg.channel.send({embeds: [m9]})
        s9.react(BDSA)
        s9.react(LDLC)
        
        }
        else if (args[1] == "win") {
            if (msg.author.id != "499977832961933342") return msg.channel.send("> **__Erreur :__** Commande indisponible");
            cpt++
            let amount = args[3]
            let amount2 = args[4]
            if (cpt > 5) { cpt = 1}
            if (args[2] == "VITB") {
                msg.delete()
                let embed = new  MessageEmbed()
                 .setAuthor({
                     name: `Play-Offs`,
                     iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
                    })
                 .setTitle(`🇫🇷 LFL - Match 3`)
                 .setDescription(`**__🏆 Gagnant :__**\n\n** ${VIT} Vitality.Bee**\n\n${VIT} **${amount} - ${amount2}** ${LDLC}`)
                 .setImage("https://pbs.twimg.com/media/FXkkbkvX0AEXZnT?format=jpg&name=large")
                 .setColor("GOLD")
                 .setTimestamp()
                 .setFooter({text: client.user.username})
                msg.channel.send({embeds: [embed]})
            }
            if (args[2] == "LDLC") {
                msg.delete()
                let embed = new  MessageEmbed()
                 .setAuthor({
                     name: `Play-Offs`,
                     iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
                    })
                 .setTitle(`🇫🇷 LFL - Match 3`)
                 .setDescription(`**__🏆 Gagnant :__**\n\n** ${LDLC} LDLC OL**\n\n${LDLC} **${amount} - ${amount2}** ${VIT}`)
                 .setImage("https://pbs.twimg.com/media/FVUbtMiWAAQHlOP?format=jpg&name=large")
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
            msg.channel.send("**__Classement:__ **https://leagueskins.go.yj.fr/event/classement\n**__Objectifs:__** https://leagueskins.go.yj.fr/event/obj")
        }
    }
})

client.login(process.env.TOKEN)
