const { Client, Collection, Intents } = require('discord.js')
const config = require('./config.json')
const fs = require('fs')

const client = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MEMBERS]
})

client.commands = new Collection()
client.aliases = new Collection()

const cmdFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'))

for (const file of cmdFiles) {

    const command = require(`./commands/${file}`)

    for (const alias of command.help.aliases) {
        client.aliases.set(alias, command)
    }

    client.commands.set(command.help.name, command)

    console.log(`${file} loaded`)

}

client.once(`ready`, () => {
    console.log(`Ja ben er!`)
    client.user.setActivity(`There are ${client.users.cache.size} kids in this basement!`)

    const updateStatus = () => {

        client.user.setPresence({

            status: "online",
            activities: [{
                name: `There are ${client.users.cache.size} kids in this basement!`
            }]

        })

    }

    setTimeout(updateStatus, 30000);

})

client.on(`messageCreate`, async(msg) => {
    if (msg.author.bot) return

    if (!msg.content.startsWith(config.prefix.toLowerCase())) return

    const msgArray = msg.content.split(" ")

    const command = msgArray[0]

    const args = msgArray.slice(1)

    const cmdData = client.commands.get(command.slice(config.prefix.length).toLowerCase()) || client.aliases.get(command.slice(config.prefix.length).toLowerCase())

    if (!cmdData) return

    try {
        cmdData.run(client, msg, args)
    } catch (error) {
        console.log(error)
        msg.reply(`Something went wrong.`)
    }

})

client.on('guildMemberAdd', async(member) => {

    const guild = client.guilds.cache.get('950761668898594846')

    const channel = guild.channels.cache.get('950761972603961344')

    channel.send(`Welcome, <@${member.id}>, to Niels's Basement! Check <#950762215533838406>, <#950762055344992307> and <#950764786965168208> and have fun!`)

})

client.login(process.env.token)