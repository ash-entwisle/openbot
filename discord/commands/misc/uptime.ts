import { uptime } from 'openbot-commons'
import { Command, ICommandData } from '../../libs/command';
import { message, EMessageType } from '../../libs/message';

export const data: ICommandData = {
    name: 'uptime',
    description: 'gets the uptime of the discord bot',
    dmPermission: true,
    nsfw: false,
    admin: false,
    execute: execute
};

export const command = new Command(data);

export async function execute(interaction: any) {
    message({
        type: EMessageType.Message,
        interaction: interaction,
        title: "",
        content: `**Uptime**: \`${uptime()}\``,
        ephemeral: true
    });
}



