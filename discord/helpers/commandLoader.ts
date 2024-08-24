import { Logger } from "openbot-commons";
import { COMMANDS } from "./commands";

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

    // for each command in COMMANDS, add it to the commands collection
    COMMANDS.forEach(command => {
        if (command.command) {
            commands.set(command.command.command.name, command);
        } else {
            Logger.error(`A command failed to load, missing required properties (either "data" or "exec"). Skipping...`);
        }
    });

    return commands;
}