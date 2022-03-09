module.exports.run = async(client, msg, args) => {

    if (!msg.member.permissions.has('MANAGE_ROLES')) return msg.reply(`You need the **MANAGE_ROLES** permission to do this!`)

    const role = msg.guild.roles.cache.get('951084129720606801')

    const mention = msg.mentions.users.first()

    const target = msg.guild.members.cache.get(mention.id)

    if(!target) return msg.reply(`Sorry I couldn't find that person!`)

    if(!role) msg.reply(`You don't have a muted role!`)

    target.roles.remove('951084203632640031')
    target.roles.add(role)

    let reason = args.slice(1).join(" ")

    if(!reason) reason = "No reason specified"

    msg.reply(`I've unmuted ${target} for ${reason}`)

}

module.exports.help = {
    name: "mute",
    aliases: []
}