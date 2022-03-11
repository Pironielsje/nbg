const { MessageEmbed } = require("discord.js")

module.exports.run = async(client, msg, args) => {

    const target = msg.mentions.users.first()

    const commonWords = [
        "p0rnz",
        "noodz",
        "Lol",
        "<a:vibecat:951761359723446272>",
        "<a:pjeace:951761359798927360>",
        "<t:4290783249238>",
        "index.js",
        "robot",
        "basement",
        "racism"
    ]

    const emails = [
        "@gmail.com",
        "@nbg.bot",
        "@mail.com",
        "@hello.com",
        "@kaas.fr",
        "@nicehash.com",
        "@banana.com"
    ]

    const ips = [
        "0.0.0.0",
        "255.142.54.23",
        "34.54.64.23",
        "65.76.45.34",
        "78.42.98.12.98",
        "12.34.56.78",
        "13.24.35.46",
        "14.25.36.47",
        "42.63.83.15",
        "42.67.53.86"
    ]

    const commonword = commonWords[Math.floor(Math.random() * commonWords.length)]

    const email = `${target.username.toLowerCase()}${emails[Math.floor(Math.random() * emails.length)]}`

    const ip = ips[Math.floor(Math.random() * ips.length)]

    msg.channel.send(`Hacking ${target.username}.`).then(m => {
        setTimeout(() => {
            m.edit(`Hacking ${target.username}..`).then(me => {
                setTimeout(() => {
                    me.edit(`Hacking ${target.username}...`).then(mes => {
                        setTimeout(() => {
                            mes.edit(`Most common word: ${commonword}.`).then(mess => {
                                setTimeout(() => {
                                    mess.edit(`Hacking ${target.username}.`).then(messa => {
                                        setTimeout(() => {
                                            messa.edit(`Hacking ${target.username}..`).then(messag => {
                                                setTimeout(() => {
                                                    messag.edit(`Hacking ${target.username}...`).then(message => {
                                                        setTimeout(() => {
                                                            message.edit(`Email: ${email}. Ip: ${ip}`)

                                                            const embed = new MessageEmbed()
                                                                .setTitle(`Information of ${target.username}`)
                                                                .setDescription(`Most common word: ${commonword}\nEmail address: ${email}\nIp address: ${ip}`)
                                                                .setColor("RANDOM")
                                                                .setFooter(`Requested by: ${msg.author.username}`, msg.author.displayAvatarURL())

                                                            msg.author.send({ embeds: [embed] })
                                                        }, 500);
                                                    })
                                                }, 500);
                                            })
                                        }, 500);
                                    })
                                }, 1000);
                            })
                        }, 1000);
                    })
                }, 500);
            })
        }, 500);
    })

}

module.exports.help = {
    name: "hack",
    aliases: ["realhack"]
}