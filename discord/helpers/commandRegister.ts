import { Bot } from "../libs/bot";
import { REST, Routes } from 'discord.js';
import { Logger } from "openbot-commons";
import { COMMANDS } from "./commands";

const fs = require('node:fs');
const path = require('node:path');

/**
 * Registers all commands in the commands directory and deploys them to Discord.
 * @param bot - The Discord bot instance.
 */
export function commandRegister(bot: Bot) {

    let cmds: string | any[] = [];

    COMMANDS.forEach(command => {
        if (command.data) {
            cmds.push(command.data.command.toJSON());
        } else {
            Logger.warn(`A command failed to register, missing required properties (either "data" or "exec"). Skipping...`);
        }
    });

    // Construct and prepare an instance of the REST module
    const rest = new REST().setToken(process.env.OPENBOT_TOKEN!);

    // and deploy your commands!
    (async () => {
        try {
            Logger.info(`Started refreshing ${cmds.length} application (/) commands.`);

            // The put method is used to fully refresh all commands in the guild with the current set
            const ac = await rest.put(
                Routes.applicationCommands(process.env.OPENBOT_ID!),
                { body: cmds },
            );

            // console.log(ac);

            // only uncomment if the discord API is being stubborn (like honestly... why...)
            const gc = await rest.put(
                Routes.applicationGuildCommands(process.env.OPENBOT_ID!, process.env.OPENBOT_GUILD!),
                { body: cmds },
            );

            console.log(cmds);

            Logger.info(`Successfully reloaded ${cmds.length} application (/) commands.`);
            
        } catch (error) {
            // And of course, make sure you catch and log any errors!
            console.log(error);
        }
    })();
}