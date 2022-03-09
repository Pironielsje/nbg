module.exports.run = async(client, msg, args) => {

    if(!msg.member.permissions.has('MANAGE_ROLES')) return msg.reply(`You need the **MANAGE_ROLES** permission to do this!`)

    const role = msg.guild.roles.cache.get('951084129720606801')

    const mention = msg.mentions.users.first()

    const target = msg.guild.members.cache.get(mention.id)

    if(!target) return msg.reply(`Sorry I couldn't find that person!`)

    if(target.roles.has(role)) return msg.reply(`This user is already muted!`)

    target.roles.remove('951084203632640031')
    target.roles.add(role)

    let time = args[1]

    let reason = args.slice(2).join(" ")

    if(!reason) reason = "No reason specified"

    let seconds = time / 1000;
    let minutes = seconds / 60;
    let hours = minutes / 60;
    let days = hours / 24;

    msg.reply(`I've unmuted ${target} for ${reason} for: ${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds. (${time} milliseconds)`)

    setTimeout(() => {
        target.roles.add('951084203632640031')
        target.roles.remove(role)
    }, time);

}

module.exports.help = {
    name: "tempmute",
    aliases: []
}