import { Logger } from "openbot-commons/logger";

const fs = require('node:fs');
const path = require('node:path');
const { Collection } = require('discord.js');


/**
 * Loads all commands from the specified folder path and returns a collection of commands.
 * @param foldersPath - The path to the folder containing the command files.
 * @returns A collection of commands.
 */
export function commandLoader(foldersPath: string) {

    let commands = new Collection();
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter((file: string) => file.endsWith('.ts'));
        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            if ('data' in command && 'execute' in command && !command.data.disabled) {
                commands.set(command.data.command.name, command);
            } else {
                Logger.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }

    return commands;
}