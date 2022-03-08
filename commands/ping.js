const { MessageEmbed } = require("discord.js")

module.exports.run = async(client, msg, args) => {

    const embed = new MessageEmbed()
        .setTitle("Pong!")
        .setDescription(`Api response time: ${Date.now() - msg.createdTimestamp}ms.\nBot Latency: ${Math.floor(Math.round(client.ws.ping))}ms`)
        .setColor("RANDOM")
        .setFooter(`Requested by: ${msg.author.username}`, msg.author.displayAvatarUrl())
        .setTimestamp()

    msg.reply(`Pinging...`).then(message => {
        setTimeout(() => {
            message.edit({embeds: [embed]})
        }, client.ws.ping);
    })

}

module.exports.help = {
    name: "ping",
    aliases: ["pong"]
}