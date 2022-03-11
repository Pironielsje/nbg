const { MessageEmbed } = require("discord.js")
const ms = require('ms')

module.exports.run = async(client, msg, args) => {

    const embed = new MessageEmbed()
        .setTitle("BotInfo")
        .setColor("RANDOM")
        .setFields({ name: "Name", value: `NBG` }, { name: "Users", value: `Total: ${client.users.cache.size}` }, { name: "Bot Owner", value: `<@920383046279102595>` }, { name: "Uptime", value: `Uptime: ${ms(client.uptime, { long: true })}` })
        .setDescription(`Requested by: ${msg.author.username}`, msg.author.displayAvatarURL())
        .setTimestamp()

    msg.channel.send({ embeds: [embed] })

}

module.exports.help = {
    name: "botinfo",
    aliases: ["bi"]
}