const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('accountable')
        .setDescription('Set a new habit to be reminded of with the format - name, message, time')
        .addStringOption(option =>
            option.setName('input')
                .setDescription('The text that echoes')
                .setRequired(true)),
    async execute(interaction) {
        const textInput = interaction.options.getString('input');
        if (!textInput) {
            return interaction.reply('Please enter the required text prompts');
        } else {
            await interaction.reply(`You entered: ${textInput}`);
        }
    },
};