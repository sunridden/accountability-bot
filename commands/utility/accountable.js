const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('accountable')
        .setDescription('Set new habits to be reminded of')
        .addStringOption(option =>
            option.setName('habit')
                .setDescription('Enter habits here')
                .setRequired(true)),
    async execute(interaction) {
        const textInput = interaction.options.getString('habit');
        if (!textInput) {
            return interaction.reply('Please enter the required text prompts');
        } else {
            await interaction.reply(`You entered: ${textInput}`);
        }
    },
};