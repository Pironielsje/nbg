module.exports.run = async(client, msg, args) => {

    const answers = [
        "Yes",
        "No",
        "Hell no",
        "Hell yes",
        "Yeah man",
        "Nah fam",
        "Always",
        "Never",
        "Probably",
        "Probably not",
        "Yuh"
    ]

    const answer = answers[Math.floor(Math.random() * answers.length)]

    if(!args[0]) return msg.reply(`Ask me a question first tho!`)

    const question = args.join(' ')

    msg.reply(`Thinking.`).then(m => {
        setTimeout(() => {
            m.edit(`Thinking..`).then(me => {
                setTimeout(() => {
                    me.edit(`Thinking...`).then(mes => {
                        setTimeout(() => {
                            mes.edit(`The answer to "${question}" is: ${answer}`)
                        }, 1000);
                    })
                }, 500);
            })
        }, 500);
    })

}

module.exports.help = {
    name: "8ball",
    aliases: []
}