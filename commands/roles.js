const { MessageActionRow, MessageSelectMenu, MessageButton } = require("discord.js")

module.exports.run = async(client, msg, args) => {

    const row = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId("nsfw")
            .setLabel("nsfw")
            .setEmoji("🔞")
            .setStyle("DANGER")
        )
        .addComponents(
            new MessageButton()
            .setCustomId("single")
            .setLabel("Single")
            .setStyle("SUCCESS")
        )
        .addComponents(
            new MessageButton()
            .setCustomId("inlove")
            .setLabel("In Love")
            .setStyle("SUCCESS")
        )
        .addComponents(
            new MessageButton()
            .setCustomId("married")
            .setLabel("Married")
            .setStyle("SUCCESS")
        )
        .addComponents(
            new MessageButton()
            .setCustomId("hehim")
            .setLabel("He/Him")
            .setStyle("SUCCESS")
        )

    const row2 = new MessageActionRow()
        .addComponents(
            new MessageButton()
            .setCustomId("sheher")
            .setLabel("She/Her")
            .setStyle("SUCCESS")
        )
        .addComponents(
            new MessageButton()
            .setCustomId("theythem")
            .setLabel("They/Them")
            .setStyle("SUCCESS")
        )
        .addComponents(
            new MessageButton()
            .setCustomId("announcementping")
            .setLabel("Announcement Pings")
            .setStyle("SUCCESS")
        )
        .addComponents(
            new MessageButton()
            .setCustomId("eventping")
            .setLabel("Event Pings")
            .setStyle("SUCCESS")
        )

    return msg.channel.send({ content: "Select your roles here!", components: [row] })

}

module.exports.help = {
    name: "roles",
    aliases: ["selectroles"]
}