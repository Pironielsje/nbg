const { Client, Collection, Intents, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')
const config = require('./config.json')
const fs = require('fs')
const { isFunction } = require('util')

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

    if (!msg.content.startsWith(config.prefix.toLowerCase())) return

    const msgArray = msg.content.split(" ")

    const command = msgArray[0]

    const args = msgArray.slice(1)

    const cmdData = client.commands.get(command.slice(config.prefix.length).toLowerCase()) || client.aliases.get(command.slice(config.prefix.length).toLowerCase())

    if (!cmdData) return

    try {
        cmdData.run(client, msg, args)
    } catch (error) {
        console.log(error)
        msg.reply(`Something went wrong.`)
    }

})

client.on('guildMemberAdd', async(member) => {

    const guild = client.guilds.cache.get('950761668898594846')

    const channel = guild.channels.cache.get('950761972603961344')

    channel.send(`Welcome, <@${member.id}>, to Niels's Basement! Check <#950762215533838406>, <#950762055344992307> and <#950764786965168208> and have fun!`)

    member.roles.add('951084203632640031')

})

client.on('interactionCreate', async(interaction) => {

    if(interaction.customId === "report") {
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
          permissionOverwrites: [
            {
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

    if(interaction.customId === "question") {
        const role = interaction.guild.roles.cache.get("950767453946929213");
        const mainRole = interaction.guild.roles.cache.get("942106316091060295");
    
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
              permissionOverwrites: [
                {
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
                content: `<@${interaction.user.id}> <@&${role}>`,
                components: [row],
              });
            });
        }
        }

    if(interaction.customId === "close") {
        const closed = new MessageEmbed()
            .setTitle(`Closed`)
            .setDescription(`Ticket closed. Channel will be deleted in 5 seconds`)
            .setColor('AQUA')

        interaction.channel.send({embeds: [closed]})

        setTimeout(() => {
            interaction.channel.delete()
        }, 5000);
    }

})

client.login(process.env.token)