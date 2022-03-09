module.exports.run = async(client, msg, args) => {
        if (!msg.member.permissions.has("MANAGE_MESSAGES")) return msg.reply(`You don't have the **MANAGE_MESSAGES** permission.`)

        if (!args[0]) return msg.reply(`Please specify how much messages to clear`)

        if (parseInt(args[0])) {

            let amount = args[0] + 1;

            msg.channel.bulkDelete(amount).then(() => {

                msg.channel.send(`Deleted ${amount} message(s)!`).then(m => {
                    setTimeout(() => {
                        m.delete()
                    }, 2000);
                })

            })

        } else if (parseInt(args[0] >= 100)) {

            msg.reply(`99 is the maximum number of messages you can delete.`)

        } else if (parseInt(args[0]) <= 0 {

                msg.reply(`You can't delete less than 1 message!`)

            } else {
                return msg.reply(`That isn't a valid number!`)
            }
        }

        module.exports.help = {
            name: "clear",
            aliases: ["purge"]
        }