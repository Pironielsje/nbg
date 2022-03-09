module.exports.run = async(client, msg, args) => {

    const statusTxt = args.join(" ")

    client.user.setPresence({

        status: "online",
        activities: [{
            name: statusTxt
        }]

    })

    return;

}

module.exports.help = {
    name: "status",
    aliases: ["setstatus"]
}