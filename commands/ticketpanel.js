const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports.run = async(client, msg, args) => {

    const embed = new MessageEmbed()
        .setTitle(`Tickets`)
        .setDescription(`Select something from the dropdown to create a ticket!`)
        .setFooter(client.user.username, client.user.displayAvatarURL())

    const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
                .setCustomId("select")
                .setPlaceholder("Nothing selected")
                .addOptions([
                    {
                        label: "🚫 Report",
                        description: "Report a player via a ticket!",
                        value: "report"
                    },
                    {
                        label: '❓ Question',
                        description: 'Ask a questrion via a ticket!',
                        value: 'question',
                    },
                ])
        )

    msg.channel.send({embeds: [embed], components: [row]})

}

module.exports.help = {
    name: "ticketpanel",
    aliases: ["tp"]
}