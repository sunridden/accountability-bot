const { SlashCommandBuilder } = require('discord.js');
const schedule = require('node-schedule');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('accountable')
        .setDescription('Set new habits to be reminded of')
        .addStringOption(option =>
            option.setName('habit')
                .setDescription('Enter habits here')
                .setRequired(true))
        .addStringOption(option =>
            option.setName('time')
                .setDescription('Set a time (e.g, 5:00 PM)')
                .setRequired(true)),
    async execute(interaction) {

        const timeOption = interaction.options.getString('time');
        const scheduledTime = convertUserTimeToCron(timeOption);
        const textInput = interaction.options.getString('habit');

        if (scheduledTime && textInput) {
            schedule.scheduleJob(scheduledTime, () => {
                interaction.user.send(`Daily reminder: ${textInput}`);
            });
        }

        if (!textInput || !scheduledTime) {
            await interaction.reply('Please enter the required text prompts in their proper formats "hh:mm AM/PM" for time (e.g, habit: workout time: 5:00 PM)');
        } else {
            await interaction.reply(`Scheduled a daily reminder of the following: ${textInput} at ${timeOption}`);
        }
    },
};

function convertUserTimeToCron(userInput) {
    const timeRegex = /^(\d+):(\d+) (AM|PM)$/i;
    const match = userInput.match(timeRegex);

    // Invalid time format
    if (!match) {
      return null;
    }

    let hour = parseInt(match[1]);
    const minute = parseInt(match[2]);
    const period = match[3].toLowerCase();

    // Invalid time format
    if (hour < 1 || hour > 12 || minute < 0 || minute > 59) {
        return null;
    }

    // Convert 12-hour format to 24-hour format
    if (period === 'pm' && hour !== 12) {
      hour += 12;
    } else if (period === 'am' && hour === 12) {
      hour = 0;
    }

    // Build the cron expression
    return `${minute} ${hour} * * *`;
}