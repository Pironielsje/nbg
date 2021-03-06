module.exports.run = async(client, msg, args) => {
    if (!msg.member.permissions.has("MANAGE_MESSAGES")) return msg.reply(`You don't have the **MANAGE_MESSAGES** permission.`)

    if (!args[0]) return msg.reply(`Please specify how much messages to clear`)

    if (parseInt(args[0])) {

        let amount = parseInt(args[0]) + 1;

        msg.channel.bulkDelete(amount).then(() => {

                if(parseInt(args[0]) == 1) {
                    msg.channel.send(`I deleted 1 message.`).then(m => {
                        setTimeout(() => {
                            m.delete()
                        }, 3000);
                    })
                } else {
                    msg.channel.send(`I deleted ${parseInt(args[0])} messages!`).then(m => {
                        setTimeout(() => {
                            m.delete()
                        }, 3000);
                    })
                }
            }).catch(err => {
                console.log(err)
                msg.reply(`Give me a number above 0 and below 100!`)

        })

    } else {
        return msg.reply(`That isn't a valid number!`)
    }
}

module.exports.help = {
    name: "clear",
    aliases: ["purge"]
}