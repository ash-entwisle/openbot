"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandLoader = void 0;
var fs = require('node:fs');
var path = require('node:path');
var Collection = require('discord.js').Collection;
/**
 * Loads all commands from the specified folder path and returns a collection of commands.
 * @param foldersPath - The path to the folder containing the command files.
 * @returns A collection of commands.
 */
function commandLoader(foldersPath) {
    var commands = new Collection();
    var commandFolders = fs.readdirSync(foldersPath);
    for (var _i = 0, commandFolders_1 = commandFolders; _i < commandFolders_1.length; _i++) {
        var folder = commandFolders_1[_i];
        var commandsPath = path.join(foldersPath, folder);
        var commandFiles = fs.readdirSync(commandsPath).filter(function (file) { return file.endsWith('.ts'); });
        for (var _a = 0, commandFiles_1 = commandFiles; _a < commandFiles_1.length; _a++) {
            var file = commandFiles_1[_a];
            var filePath = path.join(commandsPath, file);
            var command = require(filePath);
            if ('data' in command && 'execute' in command && !command.data.disabled) {
                commands.set(command.data.command.name, command);
            }
            else {
                console.log("[WARNING] The command at ".concat(filePath, " is missing a required \"data\" or \"execute\" property."));
            }
        }
    }
    return commands;
}
exports.commandLoader = commandLoader;
