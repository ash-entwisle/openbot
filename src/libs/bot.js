"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bot = void 0;
var discord_js_1 = require("discord.js");
var toml_1 = require("toml");
var fs = require('node:fs');
/**
 * Singleton class representing the Discord bot.
 */
var Bot = /** @class */ (function () {
    /**
     * Private constructor to enforce singleton pattern.
     */
    function Bot() {
        this.client = new discord_js_1.Client({ intents: [discord_js_1.GatewayIntentBits.Guilds] });
        this.commands = new discord_js_1.Collection();
        this.events = new discord_js_1.Collection();
        this.config = toml_1.default.parse(fs.readFileSync("".concat(__dirname, "/../../").concat(Bun.env.BOT_CONFIG), 'utf-8'));
    }
    /**
     * Returns the singleton instance of the Bot class.
     * @returns The Bot instance.
     */
    Bot.getInstance = function () {
        if (!Bot.instance) {
            Bot.instance = new Bot();
        }
        return Bot.instance;
    };
    return Bot;
}());
exports.Bot = Bot;
