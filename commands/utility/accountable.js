const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('accountable')
        .setDescription('Set a new habit to be reminded of with the format - name, message, time')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The text that echoes')),
    async execute(interaction) {
        const textInput = interaction.options.getString('input');
        await interaction.reply(`You entered: ${textInput}`);
    },
};