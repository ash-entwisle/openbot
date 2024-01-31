import { uptime } from '../../libs/sysinfo'
import { Command } from '../../libs/command';
import { message, EMessageType } from '../../libs/message';

export const data = new Command({
    name: 'uptime',
    description: 'gets the uptime of the discord bot',
    dmPermission: true,
    nsfw: false,
    admin: false,
    execute: execute
});

export async function execute(interaction: any) {
    message({
        type: EMessageType.Message,
        interaction: interaction,
        title: "",
        content: `**Uptime**: \`${uptime()}\``,
        ephemeral: true
    });
}



