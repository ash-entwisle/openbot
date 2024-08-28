import { Logger } from "../../commons";
import { Command } from "../../commons/discord/command";



// Info commands


// Misc commands


// Server commands


// User commands

export const COMMANDS: any[] = [

    // Fun Commands
    require("../commands/fun/coinflip"),
    require("../commands/fun/d20"),
    require("../commands/fun/diceroll"),

    // misc commands
    require("../commands/misc/eval"),
    require("../commands/misc/pfp"),
    require("../commands/misc/ping"),
    require("../commands/misc/uptime"),


]

// export function commandMap() {
//     let commandMap: { [key: string]: { data: Command, exec: any} } = {};

//     COMMANDS.forEach(command => {
//         try {
//             commandMap[command.data.name] = { data: command.data, exec: command.execute };
//             Logger.info(`Command ${command.data.command.name} loaded.`);
//         } catch (error) {
//             if (error instanceof TypeError) {
//                 Logger.error(`A command failed to load, missing required properties (either "data" or "exec").`);
//             }
//         }
//     });

//     return commandMap;
// }
    