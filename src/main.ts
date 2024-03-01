import path from "node:path";
import { commandLoader } from "./scripts/commandLoader";
import { commandRegister } from "./scripts/commandRegister";
import { eventLoader } from "./scripts/eventLoader";
import { Bot } from "./libs/bot";
import { Logger } from "./libs/logger";

// start a process of server.ts
Logger.info("Starting Server...");

Bun.spawn(["bun", "./src/server.ts"], {
  env: {
    ...process.env,
    BOT_PORT: Bun.env.BOT_PORT
  },

  onExit(proc, exitCode, signalCode, error) {
    Logger.info(`Server exited with exit code ${exitCode}`);
    if (error) {
      console.log(error);
    }
  }

})


Logger.info("Starting Bot...");

// Initialise Client
const bot = Bot.getInstance();

// create property in client to store commands
bot.commands = commandLoader(path.join(__dirname, "commands"));

// Register Commands
commandRegister(bot);

Logger.info("Commands registered");

// Load Events
eventLoader(path.join(__dirname, "events"), bot);

Logger.info("Events loaded");

// login
bot.client.login(Bun.env.DISCORD_TOKEN);

// Log that the bot is ready
bot.client.on("ready", () => {
  Logger.info("Bot is ready");
});
