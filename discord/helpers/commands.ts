import { Logger } from "openbot-commons/logger";
import { Command } from "../libs/command";



// Info commands


// Misc commands


// Server commands


// User commands

export const commands = [

    // Fun Commands
    require("../commands/fun/coinflip"),
    require("../commands/fun/d20"),
    require("../commands/fun/diceroll"),
    require("../commands/fun/gif"),
    require("../commands/fun/joke"),
    require("../commands/fun/pic"),
    require("../commands/fun/quotes"),
    require("../commands/fun/rps"),
]

export function commandMap() {
    let commandMap: { [key: string]: { data: Command, exec: any} } = {};

    commands.forEach(command => {
        try {
            commandMap[command.data.name] = { data: command.data, exec: command.execute };
            Logger.info(`Command ${command.data.command.name} loaded.`);
        } catch (error) {
            if (error instanceof TypeError) {
                Logger.error(`A command failed to load, missing required properties (either "data" or "exec").`);
            }
        }
    });

    return commandMap;
}
    