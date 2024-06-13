import { Logger } from "openbot-commons/logger";
import { commandMap } from "./commands";

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
    let cmdMap = commandMap();

    // for each command in the commandMap, add it to the commands collection
    for (const command in commandMap) {
        // check if the command has the required properties
        if (cmdMap[command].data && cmdMap[command].exec) {
            // add the command to the collection
            commands.set(command, cmdMap[command]);
        } else {
            Logger.warn(`The command at ${command} is missing a required "data" or "exec" property.`);
        }
    }

    return commands;
}