
const { Permissions, PermissionsBitField,  EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
  data: new SlashCommandBuilder()
  .setName('kick')
  .setDescription('Kicks a user from the server.'),
  
  options: [
    {
      name: 'user',
      type: 'USER',
      description: 'The user to kick.',
      required: true,
    },
    {
      name: 'reason',
      type: 'STRING',
      description: 'The reason for the kick.',
      required: false,
    },
  ],

  async execute(interaction) {
    if (!interaction.member.permissions.has(PermissionsBitField.KickMembers)) {
      return interaction.reply({ content: 'You do not have permission to use this command.', ephemeral: true });
    }

    const user = interaction.options.getUser('user');
    const reason = interaction.options.getString('reason') || 'No reason provided.';

    if (!user) {
      return interaction.reply({ content: 'Please specify a user to kick.', ephemeral: true });
    }

    const member = interaction.guild.members.cache.get(user.id);

    if (!member) {
      return interaction.reply({ content: 'That user is not a member of this server.', ephemeral: true });
    }

    if (!member.kickable) {
      return interaction.reply({content:'I cannot kick that user. Do they have a higher role than me?', ephemeral:true });
    }

    try {
      await member.kick({ reason });

      const kickEmbed = new EmbedBuilder()
        .setTitle('User Kicked')
        
        .setDescription(`Successfully kicked ${user} from the server | ${reason}.`)
        .setFooter(interaction.user.displayName);

      return interaction.reply({ embeds: [kickEmbed] });
    } catch (error) {
      console.error(error);
      return interaction.reply('An error occurred while trying to kick the user.');
    }
  },
};
