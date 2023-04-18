const { SlashCommandBuilder } = require('@discordjs/builders')
const { EmbedBuilder } = require('discord.js')

module.exports ={
  data: new SlashCommandBuilder()
  .setName('ping')
  .setDescription('Bot Real ping'),
  async execute(interaction) {
  interaction.reply('Pong!')
  }
}