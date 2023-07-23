import path from 'node:path';
import { commandLoader } from './scripts/commandLoader';
import { commandRegister } from './scripts/commandRegister';
import { eventLoader } from './scripts/eventLoader';
import { Bot } from './libs/bot';

// Initialise Client
const bot = Bot.getInstance()

// create property in client to store commands
bot.commands = commandLoader(path.join(__dirname, 'commands'));

// Register Commands
commandRegister(bot);

// Load Events
eventLoader(path.join(__dirname, 'events'), bot);

// login
bot.client.login(Bun.env.DISCORD_TOKEN);


