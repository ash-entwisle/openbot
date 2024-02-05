"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var node_path_1 = require("node:path");
var commandLoader_1 = require("./scripts/commandLoader");
var commandRegister_1 = require("./scripts/commandRegister");
var eventLoader_1 = require("./scripts/eventLoader");
var bot_1 = require("./libs/bot");
// Initialise Client
var bot = bot_1.Bot.getInstance();
// create property in client to store commands
bot.commands = (0, commandLoader_1.commandLoader)(node_path_1.default.join(__dirname, 'commands'));
// Register Commands
(0, commandRegister_1.commandRegister)(bot);
// Load Events
(0, eventLoader_1.eventLoader)(node_path_1.default.join(__dirname, 'events'), bot);
// login
bot.client.login(Bun.env.DISCORD_TOKEN);
