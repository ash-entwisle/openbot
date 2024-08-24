/**
 * Loads all event files from the specified directory and registers them with the bot client.
 * @param eventsPath - The path to the directory containing the event files.
 * @param bot - The bot instance to register the events with.
 */
import { Bot } from "../../commons/discord/bot";

const fs = require('node:fs');
const path = require('node:path');

export const events = [
    
    // on events
    require("../events/on-interactionCreate"),

    // once events
    require("../events/once-ready")
]

export function eventLoader(eventsPath: string, bot: Bot) {

    for (const event of events) {
        if (event.once) {
            bot.client.once(event.name, (...args: any) => event.execute(...args));
        } else {
            bot.client.on(event.name, (...args: any) => event.execute(...args));
        }
    }
}