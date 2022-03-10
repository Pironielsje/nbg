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
            .setEmoji("💔")
            .setStyle("SUCCESS")
        )
        .addComponents(
            new MessageButton()
            .setCustomId("inlove")
            .setLabel("In Love")
            .setEmoji("🥰")
            .setStyle("SUCCESS")
        )
        .addComponents(
            new MessageButton()
            .setCustomId("married")
            .setLabel("Married")
            .setEmoji("💍")
            .setStyle("SUCCESS")
        )
        .addComponents(
            new MessageButton()
            .setCustomId("hehim")
            .setLabel("He/Him")
            .setEmoji("👨")
            .setStyle("SUCCESS")
        )
        .addComponents(
            new MessageButton()
            .setCustomId("sheher")
            .setLabel("She/Her")
            .setEmoji("👩")
            .setStyle("SUCCESS")
        )
        .addComponents(
            new MessageButton()
            .setCustomId("theythem")
            .setLabel("They/Them")
            .setEmoji("👨👩")
            .setStyle("SUCCESS")
        )
        .addComponents(
            new MessageButton()
            .setCustomId("announcementping")
            .setLabel("Announcement Pings")
            .setEmoji("🔔")
            .setStyle("SUCCESS")
        )
        .addComponents(
            new MessageButton()
            .setCustomId("eventping")
            .setLabel("Event Pings")
            .setEmoji("🎉")
            .setStyle("SUCCESS")
        )

    return msg.channel.send({ content: "Select your roles here!", components: [row] })

}

module.exports.help = {
    name: "roles",
    aliases: ["selectroles"]
}