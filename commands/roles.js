const { MessageActionRow, MessageSelectMenu } = require("discord.js")

module.exports.run = async(client, msg, args) => {

    const options = [{
            label: "🔞 nsfw",
            value: "951401760935792641"
        },
        {
            label: "💔 Single",
            value: "951401851784400947"
        },
        {
            label: "🥰 In love",
            value: "951401975994536026"
        },
        {
            label: "💍 Married",
            value: "951402199089557504"
        },
        {
            label: "👨 He/Him",
            value: "951402988411424788"
        },
        {
            label: "👩 She/Her",
            value: "951403039288352779"
        },
        {
            label: "👨👩 They/Them",
            value: "951403094879633438"
        },
        {
            label: "🔔 Announcement pings",
            value: "951404076871065600"
        },
        {
            label: "🎉 Event pings",
            value: "951404137801732146"
        }
    ]

    const row = new MessageActionRow()
        .addComponents(
            new MessageSelectMenu()
            .setCustomId("roles")
            .setMinValues(0)
            .setMaxValues(10)
            .setPlaceholder("No roles selected.")
            .addOptions(options)
        )

    return msg.channel.send({ content: "Select your roles here!", components: [row] })

}

module.exports.help = {
    name: "roles",
    aliases: ["selectroles"]
}