import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { Command } from './command';
import toml from 'toml';

const fs = require('node:fs');

// create a singleton that will be used to store the client information

export class Bot {
    private static instance: Bot;

    public client: Client;
    public commands: Collection<string, Command>;
    public events: Collection<string, any>;
    public config: any;

    private constructor() { 
        this.client = new Client({ intents: [GatewayIntentBits.Guilds] });
        this.commands = new Collection();
        this.events = new Collection();
        this.config = toml.parse(fs.readFileSync(`${__dirname}/../../${Bun.env.BOT_CONFIG}`, 'utf-8'));
    }

    public static getInstance(): Bot {
        if (!Bot.instance) {
            Bot.instance = new Bot();
        }

        return Bot.instance;
    }
}