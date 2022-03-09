const { MessageEmbed } = require('discord.js')

module.exports.run = async(client, msg, args) => {
    if (!msg.member.permissions.has("BAN_MEMBERS")) return msg.reply("Sorry! You have to have the: **BAN_MEMBERS** permission to use this")
    if (!msg.guild.me.permissions.has("BAN_MEMBERS")) return msg.reply("Sorry! I don't have the permission to ban someone!")

    if (!args[0]) return msg.reply("Please mention at least one person or give atleast one id to ban!")

    var reason = args.slice(1).join(" ")

    if (!reason) reason = "No reason specified"

    const unbanned = new MessageEmbed()
        .setColor("RED")
        .setDescription(`Unbanned **${args[0]}** For **${reason}**`)
        .setFooter(`Requested by: ${msg.author.username}`, msg.author.displayAvatarURL())
        .setTimestamp()

    msg.guild.bans.remove(args[0]).catch(err => {
        if (err) {
            msg.reply('Something went wrong')
            console.log(err)
        }
    })
    msg.reply({ embeds: [unbanned] })
}

module.exports.help = {
    name: "unban",
    aliases: []
}