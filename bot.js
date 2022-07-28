const {Client, Intents, Collection, MessageEmbed, Message, WebhookClient} = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS]})
const prefix = "!"
const request = require('request');
var riotAPI = process.env.RIOTAPI;
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
    if (args[0] == "invite") {
        msg.channel.send('__**Invite Bot :**__\n\nhttps://leagueskins.go.yj.fr/bot/invite')
    }
    else if (args[0] == "patch") {
        if (args[1] == "12.13") {
            msg.channel.send("**__Patch 12.13 :__**\n\nhttps://leagueskins.go.yj.fr/patch/12-13")
        }
        else if (args[1] == "12.14") {
            msg.channel.send("**__Patch 12.14 :__**\n\nhttps://leagueskins.go.yj.fr/patch/12-14")
        }
        else if (args[1] == "12.12") {
            msg.channel.send("**__Patch 12.12 :__**\n\nhttps://leagueskins.go.yj.fr/patch/12-12")
        }
        else {
            msg.channel.send("> Veuillez définir un patch valide (3 derniers patch)")
        }
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
    const args = msg.content.slice(prefix.length).split(/ +/);
    
    if (msg.content.startsWith(prefix + "valorant")) {
        if (msg.author.id != "499977832961933342") return msg.channel.send("> **__Erreur :__** Commande indisponible");
        if (args[1] == "info") {
            var name = args.slice(2).join("+")
            request(`https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${name}?api_key=${riotAPI}`, function (error, response, body) {
                if (error) {
                    console.log("Erreur : ", error)
                }
                else {
                    imported = JSON.parse(body)
                    id = imported.id
                    request()
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
        let week = '9'
        let webhook = new WebhookClient({id : '994889271666278441', token: '4zJQZgLKiPbNuRhpUQVUX-sHYRnJaEhj7ooG_C9qyPbf5CQghFvS4ev9ECkQ09icnG08'})
        let GW = '<:GW:981239591103266866>'
        let GO = '<:GO:981239610002796624>'
        let KC = '<:KC:981239591166177320>'
        let ELY = '<:ELY:981239591031951450>'
        let LDLC = '<:LDLCOL:981239591027757056>'
        let VIT = '<:VIT:981239650620416000>'
        let MSF = '<:MSF:981239591153573959>'
        let BDSA = '<:BDSA:981239618882117732>'
        let OPL = '<:OPL:981239628361244733>'
        let SLY = '<:SLY:981239640310829056>'
        let date1 = "Mercredi 27 Juillet"
        let date2 = "Jeudi 28 Juillet"

        if (args[1] == "day1") {
            if (msg.author.id != "499977832961933342") return msg.channel.send("> **__Erreur :__** Commande indisponible");
            msg.delete()

            let m1 = new MessageEmbed()
            .setAuthor({
                name: `Jour 1 - Semaine ${week}`,
                iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
           })
            .setTitle("🇫🇷 LFL - Match 1")
            .setDescription(`__**Date**__: ${date1} à 18h\n\n ${OPL} **Team Oplon** <:VS:981456373957165068> **Solary** ${SLY}\n\n*Votez en réagissant ci-dessous !*`)
             .setColor("BLACK")
             .setImage('https://cdn.discordapp.com/attachments/879144621043752971/1001791196777156648/unknown.png')
             .setFooter({text: client.user.username})
             .setTimestamp(new Date(2022, 6, 27, 18, 0, 0))
            let s1 = await msg.channel.send({embeds: [m1]})
            s1.react(OPL)
            s1.react(SLY)
             
            let m2 = new MessageEmbed()
            .setAuthor({
                name: `Jour 1 - Semaine ${week}`,
                iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
           })
            .setTitle("🇫🇷 LFL - Match 2")
            .setDescription(`__**Date**__: ${date1} à 19h\n\n ${GO} **Team GO** <:VS:981456373957165068> **Team BDS Academy** ${BDSA}\n\n*Votez en réagissant ci-dessous !*`)
             .setColor("WHITE")
             .setImage('https://cdn.discordapp.com/attachments/879144621043752971/1001791397189390376/unknown.png')
             .setFooter({text: client.user.username})
             .setTimestamp(new Date(2022, 6, 27, 19, 0, 0))
            let s2 = await msg.channel.send({embeds: [m2]})
            s2.react(GO)
            s2.react(BDSA)

            let m3 = new MessageEmbed()
            .setAuthor({
                name: `Jour 1 - Semaine ${week}`,
                iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
           })
            .setTitle("🇫🇷 LFL - Match 3")
            .setDescription(`__**Date**__: ${date1} à 20h\n\n ${VIT} **Vitality.Bee** <:VS:981456373957165068> **LDLC OL** ${LDLC}\n\n*Votez en réagissant ci-dessous !*`)
             .setColor("BLACK")
             .setImage('https://cdn.discordapp.com/attachments/879144621043752971/1001791743081054208/unknown.png')
             .setFooter({text: client.user.username})
             .setTimestamp(new Date(2022, 6, 27, 20, 0, 0))
            let s3 = await msg.channel.send({embeds: [m3]})
            s3.react(VIT)
            s3.react(LDLC)

            let m4 = new MessageEmbed()
            .setAuthor({
                name: `Jour 1 - Semaine ${week}`,
                iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
           })
            .setTitle("🇫🇷 LFL - Match 4")
            .setDescription(`__**Date**__: ${date1} à 21h\n\n ${MSF} **Misfits Premier** <:VS:981456373957165068> **Karmine Corp** ${KC}\n\n*Votez en réagissant ci-dessous !*`)
            .setColor("WHITE")
            .setImage('https://media.discordapp.net/attachments/879144621043752971/1001791850534948974/unknown.png')
            .setFooter({text: client.user.username})
            .setTimestamp(new Date(2022, 6, 27, 21, 0, 0))
           let s4 = await msg.channel.send({embeds: [m4]})
           s4.react(MSF)
           s4.react(KC)

           let m5 = new MessageEmbed()
           .setAuthor({
            name: `Jour 1 - Semaine ${week}`,
            iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
       })
        .setTitle("🇫🇷 LFL - Match 5")
        .setDescription(`__**Date**__: ${date1} à 22h\n\n ${ELY} **Mirage-Elyandra** <:VS:981456373957165068> **GameWard** ${GW}\n\n*Votez en réagissant ci-dessous !*`)
        .setColor("BLACK")
        .setImage('https://cdn.discordapp.com/attachments/879144621043752971/1001791955077959700/unknown.png')
        .setFooter({text: client.user.username})
        .setTimestamp(new Date(2022, 6, 27, 22, 0, 0))
           let s5 = await msg.channel.send({embeds: [m5]})
            s5.react(ELY)
            s5.react(GW)
        }
        
        if (args[1] == "day2") {
            if (msg.author.id != "499977832961933342") return msg.channel.send("> **__Erreur :__** Commande indisponible");
            msg.delete()

            let m1 = new MessageEmbed()
            .setAuthor({
                name: `Jour 2 - Semaine ${week}`,
                iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
           })
            .setTitle("🇫🇷 LFL - Match 1")
            .setDescription(`__**Date**__: ${date2} à 18h\n\n ${GO} **Team GO** <:VS:981456373957165068> **Mirage-Elyandra** ${ELY}\n\n*Votez en réagissant ci-dessous !*`)             .setColor("BLACK")
             .setTimestamp(new Date(2022, 6, 28, 18, 0, 0))
             .setImage('https://media.discordapp.net/attachments/879144621043752971/1002184177128575037/unknown.png')
             .setFooter({text: client.user.username})
            let s1 = await msg.channel.send({embeds: [m1]})
            s1.react(GO)
            s1.react(ELY)
            
             
            let m2 = new MessageEmbed()
            .setAuthor({
                name: `Jour 2 - Semaine ${week}`,
                iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
           })
            .setTitle("🇫🇷 LFL - Match 2")
            .setDescription(`__**Date**__: ${date2} à 19h\n\n ${SLY} **Solary** <:VS:981456373957165068> **GameWard** ${GW}\n\n*Votez en réagissant ci-dessous !*`)
             .setColor("WHITE")
             .setTimestamp(new Date(2022, 6, 28, 19, 0, 0))
             .setImage('https://cdn.discordapp.com/attachments/879144621043752971/1002184477772099625/unknown.png')
             .setFooter({text: client.user.username})
            let s2 = await msg.channel.send({embeds: [m2]})
            s2.react(SLY)
            s2.react(GW)

            let m3 = new MessageEmbed()
             .setAuthor({
                 name: `Jour 2 - Semaine ${week}`,
                 iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
            })
             .setTitle("🇫🇷 LFL - Match 3")
             .setDescription(`__**Date**__: ${date2} à 20h\n\n ${VIT} **Vitality.Bee** <:VS:981456373957165068> **Team BDS Academy** ${BDSA}\n\n*Votez en réagissant ci-dessous !*`)             
             .setColor("BLACK")
             .setTimestamp(new Date(2022, 6, 28, 20, 0, 0))
             .setImage('https://cdn.discordapp.com/attachments/879144621043752971/1002184640779538462/unknown.png')
             .setFooter({text: client.user.username})
            let s3 = await msg.channel.send({embeds: [m3]})
            s3.react(VIT)
            s3.react(BDSA)

            let m4 = new MessageEmbed()
            .setAuthor({
                name: `Jour 2 - Semaine ${week}`,
                iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
           })
            .setTitle("🇫🇷 LFL - Match 4")
            .setDescription(`__**Date**__: ${date2} à 21h\n\n ${LDLC} **LDLC OL** <:VS:981456373957165068> **Karmine Corp** ${KC}\n\n*Votez en réagissant ci-dessous !*`)
            .setColor("WHITE")
            .setTimestamp(new Date(2022, 6, 28, 21, 0, 0))
            .setImage('https://cdn.discordapp.com/attachments/879144621043752971/1002184793141817355/unknown.png')
            .setFooter({text: client.user.username})
           let s4 = await msg.channel.send({embeds: [m4]})
           s4.react(LDLC)
           s4.react(KC)

           let m5 = new MessageEmbed()
           .setAuthor({
            name: `Jour 2 - Semaine ${week}`,
            iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
       })
        .setTitle("🇫🇷 LFL - Match 5")
        .setDescription(`__**Date**__: ${date2} à 22h\n\n ${OPL} **Team Oplon** <:VS:981456373957165068> **Misfits Premier** ${MSF}\n\n*Votez en réagissant ci-dessous !*`)
            .setColor("BLACK")
            .setTimestamp(new Date(2022, 6, 28, 22, 0, 0))
            .setImage('https://cdn.discordapp.com/attachments/879144621043752971/1002185259061883010/unknown.png')
            .setFooter({text: client.user.username})
           let s5 = await msg.channel.send({embeds: [m5]})
           s5.react(OPL)
           s5.react(MSF)
           
        }
        else if (args[1] == "win") {
            if (msg.author.id != "499977832961933342") return msg.channel.send("> **__Erreur :__** Commande indisponible");
            cpt++
            let day = args[3]
            if (cpt > 5) { cpt = 1}
            if (args[2] == "VITB") {
                msg.delete()
                let embed = new  MessageEmbed()
                 .setAuthor({
                     name: `Jour ${day} - Semaine ${week}`,
                     iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
                    })
                 .setTitle(`🇫🇷 LFL - Match ${cpt}`)
                 .setDescription(`**__🏆 Gagnant :__**\n\n**Vitality.Bee <:VIT:981239650620416000>**`)
                 .setColor("GOLD")
                 .setTimestamp()
                 .setFooter({text: client.user.username})
                msg.channel.send({embeds: [embed]})
            }
            if (args[2] == "KC") {
                msg.delete()
                let embed = new MessageEmbed()
                .setAuthor({
                    name: `Jour ${day} - Semaine ${week}`,
                    iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
                   })
                .setTitle(`🇫🇷 LFL - Match ${cpt}`)
                .setDescription(`**__🏆 Gagnant :__**\n\n**Karmine Corp ${KC}**`)
                 .setColor("GOLD")
                 .setTimestamp()
                 .setFooter({text: client.user.username})
               msg.channel.send({embeds: [embed]})
            }
            if (args[2] == "OPL") {
                msg.delete()
                let embed = new MessageEmbed()
                .setAuthor({
                    name: `Jour ${day} - Semaine ${week}`,
                    iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
                   })
                .setTitle(`🇫🇷 LFL - Match ${cpt}`)
                .setDescription(`**__🏆 Gagnant :__**\n\n**Team Oplon ${OPL}**`)
                 .setColor("GOLD")
                 .setTimestamp()
                 .setFooter({text: client.user.username})
               msg.channel.send({embeds: [embed]})
            }
            if (args[2] == "SLY") {
                msg.delete()
                let embed = new MessageEmbed()
                .setAuthor({
                    name: `Jour ${day} - Semaine ${week}`,
                    iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
                   })
                .setTitle(`🇫🇷 LFL - Match ${cpt}`)
                .setDescription(`**__🏆 Gagnant :__**\n\n**Solary ${SLY}**`)
                 .setColor("GOLD")
                 .setTimestamp()
                 .setFooter({text: client.user.username})
               msg.channel.send({embeds: [embed]})
            }
            if (args[2] == "LDLC") {
                msg.delete()
                let embed = new MessageEmbed()
                .setAuthor({
                    name: `Jour ${day} - Semaine ${week}`,
                    iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
                   })
                .setTitle(`🇫🇷 LFL - Match ${cpt}`)
                .setDescription(`**__🏆 Gagnant :__**\n\n**LDLC OL ${LDLC}**`)
                 .setColor("GOLD")
                 .setTimestamp()
                 .setFooter({text: client.user.username})
                msg.channel.send({embeds: [embed]})
            }
            if (args[2] == "BDSA") {
                msg.delete()
                let embed = new MessageEmbed()
                .setAuthor({
                    name: `Jour ${day} - Semaine ${week}`,
                    iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
                   })
                .setTitle(`🇫🇷 LFL - Match ${cpt}`)
                .setDescription(`**__🏆 Gagnant :__**\n\n**Team BDS Academy ${BDSA}**`)
                 .setColor("GOLD")
                 .setImage()
                 .setFooter({text: client.user.username})
                msg.channel.send({embeds: [embed]})
            }
            if (args[2] == "ELY") {
                msg.delete()
                let embed = new MessageEmbed()
                .setAuthor({
                    name: `Jour ${day} - Semaine ${week}`,
                    iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
                   })
                .setTitle(`🇫🇷 LFL - Match ${cpt}`)
                .setDescription(`**__🏆 Gagnant :__**\n\n**Mirage-Elyandra ${ELY}**`)
                 .setColor("GOLD")
                 .setTimestamp()
                 .setFooter({text: client.user.username})
                msg.channel.send({embeds: [embed]})
            }
            if (args[2] == "GO") {
                msg.delete()
                let embed = new MessageEmbed()
                .setAuthor({
                    name: `Jour ${day} - Semaine ${week}`,
                    iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
                   })
                .setTitle(`🇫🇷 LFL - Match ${cpt}`)
                .setDescription(`**__🏆 Gagnant :__**\n\n**Team GO ${GO}**`)
                 .setColor("GOLD")
                 .setTimestamp()
                 .setFooter({text: client.user.username})
                msg.channel.send({embeds: [embed]})
            }
            if (args[2] == "GW") {
                msg.delete()
                let embed = new MessageEmbed()
                .setAuthor({
                    name: `Jour ${day} - Semaine ${week}`,
                    iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
                   })
                .setTitle(`🇫🇷 LFL - Match ${cpt}`)
                .setDescription(`**__🏆 Gagnant :__**\n\n**GameWard ${GW}**`)
                 .setColor("GOLD")
                 .setTimestamp()
                 .setFooter({text: client.user.username})
                msg.channel.send({embeds: [embed]})
            }
            if (args[2] == "MSF") {
                msg.delete()
                let embed = new MessageEmbed()
                .setAuthor({
                    name: `Jour ${day} - Semaine ${week}`,
                    iconURL: "https://yt3.ggpht.com/R-LnoDWNxzdEqdiNvH1yoOAKNaRwlgZSFoC8-HBjae97HLESiu2cbE27uJtyeHAg5u44ySi-1w=s900-c-k-c0x00ffffff-no-rj"
                   })
                .setTitle(`🇫🇷 LFL - Match ${cpt}`)
                .setDescription(`**__🏆 Gagnant :__**\n\n**Misfits Premier ${MSF}**`)
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
            msg.channel.send("**__Classement:__** https://leagueskins.go.yj.fr/event/classement\n**__Objectifs:__** https://leagueskins.go.yj.fr/event/obj")
        }
    }
})

client.login(process.env.TOKEN)
