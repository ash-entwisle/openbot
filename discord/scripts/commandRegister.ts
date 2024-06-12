import { Bot } from "../libs/bot";
import { REST, Routes } from 'discord.js';
import { Logger } from "../libs/logger";

const fs = require('node:fs');
const path = require('node:path');

/**
 * Registers all commands in the commands directory and deploys them to Discord.
 * @param bot - The Discord bot instance.
 */
export function commandRegister(bot: Bot) {
    const commands = [];
    // Grab all the command folders from the commands directory you created earlier
    const foldersPath = path.join(__dirname, '../commands');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        // Grab all the command files from the commands directory you created earlier
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.ts'));
        // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command) {
                commands.push(command.data.command.toJSON());
            } else {
                Logger.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`)
            }
        }
    }

    // Construct and prepare an instance of the REST module
    const rest = new REST().setToken(Bun.env.DISCORD_TOKEN!);

    // and deploy your commands!
    (async () => {
        try {
            Logger.info(`Started refreshing ${commands.length} application (/) commands.`);

            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationCommands(Bun.env.DISCORD_ID!),
                { body: commands },
            );

            Logger.info(`Successfully reloaded ${commands.length} application (/) commands.`);
            
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.log(error);
        }
    })();
}