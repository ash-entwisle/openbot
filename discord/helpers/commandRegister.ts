import { Bot } from "../libs/bot";
import { REST, Routes } from 'discord.js';
import { Logger } from "openbot-commons/logger";
import { commandMap } from "./commands";

const fs = require('node:fs');
const path = require('node:path');

/**
 * Registers all commands in the commands directory and deploys them to Discord.
 * @param bot - The Discord bot instance.
 */
export function commandRegister(bot: Bot) {

    let commands = [];
    let cmdMap = commandMap();

    for (const command in commandMap) {
        if (cmdMap[command].data && cmdMap[command].exec) {
            commands.push(cmdMap[command].data.command.toJSON());
        } else {
            Logger.warn(`The command at ${command} is missing a required "data" or "exec" property.`);
        }
    }

    // Construct and prepare an instance of the REST module
    const rest = new REST().setToken(process.env.OPENBOT_TOKEN!);

    // and deploy your commands!
    (async () => {
        try {
            Logger.info(`Started refreshing ${commands.length} application (/) commands.`);

            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationCommands(process.env.OPENBOT_ID!),
                { body: commands },
            );

            Logger.info(`Successfully reloaded ${commands.length} application (/) commands.`);
            
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            // console.log(error);
        }
    })();
}