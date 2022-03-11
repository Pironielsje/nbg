const { MessageEmbed } = require('discord.js')

module.exports.run = async(client, msg, args) => {

    let target = msg.mentions.users.first()

    if (!target) target = msg.author

    const embed = new MessageEmbed()
        .setTitle(target.username)
        .setFields({ name: "Joined server at", value: `Joined: ${target.joinedAt}`, inline: true }, { name: "Joined discord at", value: `Joined: ${target.createdAt}` }, { name: "ID", value: `ID: ${target.id}`, inline: true }, { name: "Roles", value: `Roles: ${target.roles}` })
        .setFooter(`Requested by: ${msg.author.username}`, msg.author.displayAvatarURL())
        .setTimestamp()
        .setColor("RANDOM")

    msg.channel.send({ embeds: [embed] })

}

module.exports.help = {
    name: "userinfo",
    aliases: ["ui"]
}