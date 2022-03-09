module.exports.run = async(client, msg, args) => {

    if (!msg.member.permissions.has('MANAGE_ROLES')) return msg.reply(`You need the **MANAGE_ROLES** permission to do this!`)

    const role = msg.guild.roles.cache.get('')

}

module.exports.help = {
    name: "mute"
}