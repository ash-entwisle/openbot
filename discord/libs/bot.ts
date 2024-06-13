import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { Command } from './command';
import toml from 'toml';

const fs = require('node:fs');

/**
 * Singleton class representing the Discord bot.
 */
export class Bot {
    private static instance: Bot;

    /** The Discord.js client instance. */
    public client: Client;

    /** Collection of registered commands. */
    public commands: Collection<string, Command>;

    /** Collection of registered events. */
    public events: Collection<string, any>;

    /** The bot's configuration object. */
    public config: any;

    /**
     * Private constructor to enforce singleton pattern.
     */
    private constructor() { 
        this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
        this.commands = new Collection();
        this.events = new Collection();

        console.log(`${__dirname}/../../${process.env.OPENBOT_CONFIG}`)
        this.config = toml.parse(fs.readFileSync(`${__dirname}/../../${process.env.OPENBOT_CONFIG}`, 'utf-8'));
    }

    /**
     * Returns the singleton instance of the Bot class.
     * @returns The Bot instance.
     */
    public static getInstance(): Bot {
        if (!Bot.instance) {
            Bot.instance = new Bot();
        }

        return Bot.instance;
    }
}