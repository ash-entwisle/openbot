import { Events } from 'discord.js'
import { Bot } from '../libs/bot';
import { Logger } from 'openbot-commons';

export const name = Events.InteractionCreate;
export const once = false;

export async function execute(interaction: any) {

    if (!interaction.isChatInputCommand()) return;


    let bot = Bot.getInstance();

    const command = bot.commands.get(interaction.commandName);

    if (!command) {
        Logger.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        const userID = interaction.user.id;

        const adminIDs = Bot.getInstance().config.admins;
        
        // TODO: add enabled check

        if (command.admin && !adminIDs.includes(userID)) {
            await interaction.reply('You do not have permission to use this command.');
            return;
        } else {
            await command.execute(interaction);
        }


    } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
    }
}
