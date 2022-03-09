const { MessageEmbed, MessageActionRow, MessageSelectMenu, Message, MessageButton } = require("discord.js")

module.exports.run = async(client, msg, args) => {

    const embed = new MessageEmbed()
        .setTitle(`Tickets`)
        .setDescription(`Select something from the dropdown to create a ticket!`)
        .setFooter(client.user.username, client.user.displayAvatarURL())

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
                .setCustomId('report')
                .setLabel("Report")
                .setEmoji('🚫')
                .setStyle("SUCCESS")
        ).addComponents(
            new MessageButton()
                .setCustomId('question')
                .setLabel("Question")
                .setEmoji('❓')
                .setStyle("SUCCESS")
        )

    msg.channel.send({embeds: [embed], components: [row]})

}

module.exports.help = {
    name: "ticketpanel",
    aliases: ["tp"]
}