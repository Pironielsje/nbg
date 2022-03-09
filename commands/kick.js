const { MessageEmbed } = require("discord.js")

module.exports.run = async(client, msg, args) => {
    if (!msg.member.permissions.has("BAN_MEMBERS")) return msg.reply("Sorry! You have to have the: **BAN_MEMBERS** permission to use this")
    if (!msg.guild.me.permissions.has("BAN_MEMBERS")) return msg.reply("Sorry! I don't have the permission to ban someone!")

    if (!args[0]) return msg.reply("Please mention at least one person or give atleast one id to ban!")

    const target = msg.mentions.members.first()

    const user = msg.guild.members.cache.get(target.user.id || args[0])

    if (!user) return msg.reply("I can't seem to find this user. Is the id or mention correct?")

    if (user.permissions.has("MANAGE_MESSAGES")) return msg.reply("Couldn't kick a moderator.")

    var reason = args.slice(1).join(" ")

    if (!reason) reason = "No reason specified!"

    const banned = new MessageEmbed()
        .setColor("RED")
        .setDescription(`Kicked **${user} (${user.id})** For **${reason}** by **${msg.author.username}**`)
        .setFooter(`Requested by: ${msg.author.username}`, msg.author.displayAvatarURL())
        .setTimestamp()

    user.kick(reason).catch(err => {
        if (err) {
            msg.reply('Something went wrong')
            console.log(err)
        }
    })
    msg.reply({ embeds: [banned] })
}

module.exports.help = {
    name: "kick",
    aliases: []
}