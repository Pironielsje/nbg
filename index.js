const { Client, Collection, Intents, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const config = require('./config.json')
const fs = require('fs')
const { isFunction } = require('util')
const swearwords = require('./data/swearwords.json')
const lvlFile = require('./data/levels.json')

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]
})

client.commands = new Collection()
client.aliases = new Collection()

const cmdFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'))

for (const file of cmdFiles) {

    const command = require(`./commands/${file}`)

    for (const alias of command.help.aliases) {
        client.aliases.set(alias, command)
    }

    client.commands.set(command.help.name, command)

    console.log(`${file} loaded`)

}

client.on(`ready`, () => {
    console.log(`Ja ben er!`)
    client.user.setActivity(`This basement`, { type: "WATCHING" })

})

client.on(`messageCreate`, async(msg) => {
    if (msg.author.bot) return

    const msgArray = msg.content.split(" ")

    const command = msgArray[0]

    if (!msg.content.toLowerCase().startsWith(config.prefix)) {

      RandomXp(msg);

      let message = msg.content.toLowerCase()

      for(let i = 0; i < swearwords.length; i++) {
        const swearword = swearwords[i]

        if(message.includes(swearword.toLowerCase)) {
          msg.delete();
          msg.channel.send(`<@${msg.author.id}> you can't say that!`).then(m => {
            setTimeout(() => {
              m.delete()
            }, 2000);
          })
        }

      }

    } else {  
      const args = msgArray.slice(1)
  
      const cmdData = client.commands.get(command.slice(config.prefix.length).toLowerCase()) || client.aliases.get(command.slice(config.prefix.length).toLowerCase())
  
      if (!cmdData) return
  
      try {
          cmdData.run(client, msg, args)
      } catch (error) {
          console.log(error)
          msg.reply(`Something went wrong.`)
      }
  
    }
})

client.on('guildMemberAdd', async(member) => {

    const guild = client.guilds.cache.get('950761668898594846')

    const channel = guild.channels.cache.get('950761972603961344')

    channel.send(`Welcome, <@${member.id}>, to Niels's Basement! Check <#950762215533838406>, <#950762055344992307> and <#950764786965168208> and have fun!`)

    member.roles.add('951084203632640031')

})

client.on('interactionCreate', async(interaction) => {

    if (interaction.customId === "report") {
        const role = interaction.guild.roles.cache.get("950767453946929213");
        const mainRole = interaction.guild.roles.cache.get("951084203632640031");

        if (
            interaction.guild.channels.cache.find(
                (c) => c.name === `ticket-${interaction.user.username}-report`
            )
        ) {
            return interaction.reply({
                content: "You already have an open ticket!",
                ephemeral: true,
            });
        } else {
            interaction.guild.channels
                .create(`ticket-${interaction.user.username}-report`, {
                    parent: "951176916742848562",
                    topic: `${interaction.user.username}'s ticket`,
                    permissionOverwrites: [{
                            id: interaction.user.id,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES"],
                        },
                        {
                            id: client.user.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "EMBED_LINKS", "ATTACH_FILES"],
                        },
                        {
                            id: role,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "EMBED_LINKS", "ATTACH_FILES"],
                        },
                        {
                            id: mainRole,
                            deny: ["SEND_MESSAGES", "VIEW_CHANNEL"],
                        },
                    ],
                    type: "GUILD_TEXT",
                })
                .then((c) => {
                    interaction.reply({
                        content: `Your ticket is created! <#${c.id}>`,
                        ephemeral: true,
                    });

                    const ticket = new MessageEmbed()
                        .setColor("AQUA")
                        .setDescription(`Don't worry! Staff's on it's way!`)
                        .setTitle(`🚫 Report ticket!`)

                    const row = new MessageActionRow()
                        .addComponents(
                            new MessageButton()
                            .setCustomId("close")
                            .setLabel("Close ticket")
                            .setEmoji("🔒")
                            .setStyle("DANGER")
                        );

                    c.send({
                        content: `<@${interaction.user.id}> ${role}`,
                        components: [row],
                        embeds: [ticket]
                    });
                });
        }
    }

    if (interaction.customId === "question") {
        const role = interaction.guild.roles.cache.get("950767453946929213");
        const mainRole = interaction.guild.roles.cache.get("951084203632640031");

        if (
            interaction.guild.channels.cache.find(
                (c) => c.name === `ticket-${interaction.user.username}-question`
            )
        ) {
            return interaction.reply({
                content: "You already have an open ticket!",
                ephemeral: true,
            });
        } else {
            interaction.guild.channels
                .create(`ticket-${interaction.user.username}-question`, {
                    parent: "951176916742848562",
                    topic: `${interaction.user.username}'s ticket`,
                    permissionOverwrites: [{
                            id: interaction.user.id,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS", "ATTACH_FILES"],
                        },
                        {
                            id: client.user.id,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "EMBED_LINKS", "ATTACH_FILES"],
                        },
                        {
                            id: role,
                            allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "EMBED_LINKS", "ATTACH_FILES"],
                        },
                        {
                            id: mainRole,
                            deny: ["SEND_MESSAGES", "VIEW_CHANNEL"],
                        },
                    ],
                    type: "GUILD_TEXT",
                })
                .then((c) => {
                    interaction.reply({
                        content: `Your ticket is created! <#${c.id}>`,
                        ephemeral: true,
                    });

                    const ticket = new MessageEmbed()
                        .setColor("AQUA")
                        .setDescription(`Don't worry! Staff's on it's way!`)
                        .setTitle(`❓ Question ticket!`)

                    const row = new MessageActionRow().addComponents(
                        new MessageButton()
                        .setCustomId("close")
                        .setLabel("Close ticket")
                        .setEmoji("🔒")
                        .setStyle("DANGER")
                    );

                    c.send({
                        content: `<@${interaction.user.id}> ${role}`,
                        components: [row],
                        embeds: [ticket]
                    });
                });
        }
    }

    if (interaction.customId === "close") {
        const closed = new MessageEmbed()
            .setTitle(`Closed`)
            .setDescription(`Ticket closed. Channel will be deleted in 5 seconds`)
            .setColor('AQUA')

        interaction.channel.send({ embeds: [closed] })

        setTimeout(() => {
            interaction.channel.delete()
        }, 5000);
    }

    if (interaction.customId === "nsfw") {
        const nsfwRole = interaction.guild.roles.cache.get("951401760935792641")

        interaction.member.roles.add(nsfwRole)
        interaction.reply({ content: "Gave you the nsfw role!", ephemeral: true })
    }

    if (interaction.customId === "single") {
        const nsfwRole = interaction.guild.roles.cache.get("951401851784400947")

        interaction.member.roles.add(nsfwRole)
        interaction.reply({ content: "Gave you the single role!", ephemeral: true })
    }

    if (interaction.customId === "inlove") {
        const nsfwRole = interaction.guild.roles.cache.get("951401975994536026")

        interaction.member.roles.add(nsfwRole)
        interaction.reply({ content: "Gave you the in love role!", ephemeral: true })
    }

    if (interaction.customId === "married") {
        const nsfwRole = interaction.guild.roles.cache.get("951402199089557504")

        interaction.member.roles.add(nsfwRole)
        interaction.reply({ content: "Gave you the married role!", ephemeral: true })
    }

    if (interaction.customId === "hehim") {
        const nsfwRole = interaction.guild.roles.cache.get("951402988411424788")

        interaction.member.roles.add(nsfwRole)
        interaction.reply({ content: "Gave you the he/him role!", ephemeral: true })
    }

    if (interaction.customId === "sheher") {
        const nsfwRole = interaction.guild.roles.cache.get("951403039288352779")

        interaction.member.roles.add(nsfwRole)
        interaction.reply({ content: "Gave you the she/her role!", ephemeral: true })
    }

    if (interaction.customId === "theythem") {
        const nsfwRole = interaction.guild.roles.cache.get("951403094879633438")

        interaction.member.roles.add(nsfwRole)
        interaction.reply({ content: "Gave you the they/them role!", ephemeral: true })
    }

    if (interaction.customId === "announcementping") {
        const nsfwRole = interaction.guild.roles.cache.get("951404076871065600")

        interaction.member.roles.add(nsfwRole)
        interaction.reply({ content: "Gave you the announcement ping role!", ephemeral: true })
    }

    if (interaction.customId === "eventping") {
        const nsfwRole = interaction.guild.roles.cache.get("951404137801732146")

        interaction.member.roles.add(nsfwRole)
        interaction.reply({ content: "Gave you the event ping role!", ephemeral: true })
    }

})

client.on("messageDelete", (message) => {

  if(!message.author.bot) return

  const channel = message.guild.channels.cache.get('951510334601052231')

  const embed = new MessageEmbed()
    .setTitle("Message Deleted")
    .setDescription(`Channel: ${message.channel}\nMessage content: **${message.content}**\nAuthor: **<@${message.author.id}>**`)
    .setColor("RED")

  channel.send({embeds: [embed]})

})

client.on("messageUpdate", (oldMessage, newMessage) => {

  if(!message.author.bot)

  const channel = message.guild.channels.cache.get('951510334601052231')

  const embed = new MessageEmbed()
    .setTitle("Message Edited")
    .setDescription(`Channel: ${message.channel}\nOld message: ${oldMessage.content}\nNew message: **${newMessage.content}**\nAuthor: **<@${message.author.id}>**`)
    .setColor("YELLOW")

  channel.send({embeds: [embed]})

})

client.on("channelDelete", (delChannel) => {

  if(!message.author.bot)

  const channel = message.guild.channels.cache.get('951510334601052231')

  const embed = new MessageEmbed()
    .setTitle("Channel Deleted")
    .setDescription(`Channel Name: ${delChannel}`)
    .setColor("RED")

  channel.send({embeds: [embed]})

})

function RandomXp(msg) {

  var randNumber = Math.floor(Math.random() * 10) + 1;

  var idUser = msg.author.id;

  if(!lvlFile[idUser]) {
    lvlFile[idUser] = {
      xp: 0,
      lvl: 0
    }
  }

  lvlFile[idUser].xp += randNumber

  var lvlUser = lvlFile[idUser].lvl
  var xpUser = lvlFile[idUser].xp

  var nextLvlXp = lvlUser * 300

  if(nextLvlXp == 0) nextLvlXp = 100

  if(xpUser >= nextLvlXp){

    lvlFile[idUser].level += 1

    msg.channel.send(`Congratulations <@${msg.author.id}>! You just leveled up to lvl ${lvlFile[idUser].level}!`)

    fs.writeFile("./data/levels.json", JSON.stringify(lvlFile), err => {
      if(err) console.log(err)
    })

  }

}

client.login(process.env.token)