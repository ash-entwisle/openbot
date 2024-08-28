import { uptime } from '../../../commons'
import { Command, ICommandData } from '../../../commons/discord/command';
import { send_message, EMessageType } from '../../../commons/discord/message';

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
    send_message({
        type: EMessageType.Message,
        interaction: interaction,
        title: "",
        content: `**Uptime**: \`${uptime()}\``,
        ephemeral: true
    });
}



