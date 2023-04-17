const { Client, IntentsBitField } = require('discord.js')
require('dotenv')

const client = new Client({
  intents: [IntentsBitField.Flags.Guilds],
})
client.on('ready', () => {
console.log('Bot is ready')
})

client.login(process.env.TOKEN)