import { Events } from 'discord.js';
import { Logger } from 'openbot-commons/logger';

export const name = Events.ClientReady;
export const once = true;

export async function execute(client: any) {
    Logger.info(`Logged in as ${client.user.tag}`);
}