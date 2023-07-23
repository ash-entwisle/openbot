import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { Command } from './command';

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
        this.config = require('../../config.json'); 
    }

    public static getInstance(): Bot {
        if (!Bot.instance) {
            Bot.instance = new Bot();
        }

        return Bot.instance;
    }
}