import path from "node:path";
import { commandLoader } from "./helpers/commandLoader";
import { commandRegister } from "./helpers/commandRegister";
import { eventLoader } from "./helpers/eventLoader";
import { Bot } from "../commons/discord/bot";
import { Logger } from "../commons";


async function startBot() {

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

  bot.client.login(process.env.OPENBOT_TOKEN);

  // Log that the bot is ready
  bot.client.on("ready", () => {
    Logger.info("Bot is ready");
  });
}

export default startBot;
