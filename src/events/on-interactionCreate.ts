import { Events } from 'discord.js'
import { Bot } from '../libs/bot';

export const name = Events.InteractionCreate;
export const once = false;

export async function execute(interaction: any) {
    if (!interaction.isChatInputCommand()) return;

    let bot = Bot.getInstance();
    const command = bot.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(`Error executing ${interaction.commandName}`);
        console.error(error);
    }
}
