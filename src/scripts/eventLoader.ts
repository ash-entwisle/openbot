/**
 * Loads all event files from the specified directory and registers them with the bot client.
 * @param eventsPath - The path to the directory containing the event files.
 * @param bot - The bot instance to register the events with.
 */
import { Bot } from "../libs/bot";

const fs = require('node:fs');
const path = require('node:path');


export function eventLoader(eventsPath: string, bot: Bot) {

    const eventFiles = fs.readdirSync(eventsPath).filter((file: string) => file.endsWith('.ts'));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const event = require(filePath);
        if (event.once) {
            bot.client.once(event.name, (...args: any) => event.execute(...args));
        } else {
            bot.client.on(event.name, (...args: any) => event.execute(...args));
        }
    }
}