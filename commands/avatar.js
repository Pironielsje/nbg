const { MessageEmbed } = require("discord.js")

module.exports.run = async(client, msg, args) => {

    let target = msg.mentions.users.first()

    if (!target) target = msg.author

    const embed = new MessageEmbed()
        .setTitle(target.username)
        .setImage(target.displayAvatarURL())
        .setFooter(`Requested by: ${msg.author.username}`, msg.author.displayAvatarURL())
        .setTimestamp()
        .setColor("RANDOM")

    msg.channel.send({ embeds: [embed] })

}

module.exports.help = {
    name: "avatar",
    aliases: ["av"]
}