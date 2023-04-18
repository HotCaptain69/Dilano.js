const { EmbedBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Bot Command Menu'),
  async execute(interaction) {
    // Create the embed message
    const helpEmbed = new EmbedBuilder()
      .setTitle('Dilano Help Command')
      .setDescription(`Click on the buttons that is given below to get specified category's commands list.

      <:moderator_red:1097787356783849493> - Moderation

      <:Lojas_red:1097207361099284500> - Information`);
    
    const mod = new EmbedBuilder()
      .setTitle('Dilano Moderation Commands')
      .setDescription('kick');

    const info = new EmbedBuilder()
    .setTitle('Dilano Information Commands')
    .setDescription('ping, help')
    
    // Create the Buttons
    const moderatorButton = new ButtonBuilder()
      .setCustomId('moderator_button')
      .setLabel('Moderation')
      .setStyle(ButtonStyle.Primary)
      .setEmoji('1097787356783849493');
    
    const informationButton = new ButtonBuilder()
      .setCustomId('information_button')
      .setLabel('Information')
      .setStyle(ButtonStyle.Primary)
      .setEmoji('1097207361099284500'); // You can change it to any emoji you like
      
    // Create the row to hold the Buttons
    const buttonRow = new ActionRowBuilder()
      .addComponents(moderatorButton, informationButton);
    
    // Send the reply with the embed and buttons
    const response = await interaction.reply({
      embeds: [helpEmbed],
      components: [buttonRow]
    });
    
    const filter = i => i.user.id === interaction.user.id;
    const collector = response.createMessageComponentCollector({ filter, time: 60000 });
    
    collector.on('collect', async interaction => {
      if (interaction.customId === 'moderator_button') {
        await interaction.update({ embeds: [mod] });
      }
        else if(interaction.customId === 'information_button') {
          await interaction.update({ embeds: [info] })
        }
        
      
    });
    
    
  }
};