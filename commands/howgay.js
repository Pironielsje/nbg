module.exports.run = async(client, msg, args) => {

    let percentage = Math.floor(Math.random() * 100) + 1

    msg.reply("Let's see!").then(message => {
        setTimeout(() => {
            message.edit(`You are ${percentage}% gay!`)
        }, 3000);
    })

}

module.exports.help = {
    name: "howgay",
    aliases: ["gaycount"]
}