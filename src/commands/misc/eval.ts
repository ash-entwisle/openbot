import { uptime } from '../../libs/sysinfo'
import { Command } from '../../libs/command';
import { embed } from '../../libs/reply';

export const data = new Command({
    name: 'eval',
    description: 'evaluates JS code and returns the result',
    dmPermission: true,
    nsfw: false,
    admin: true,
    execute: execute
});

export async function execute(interaction: any) {
    embed({
        interaction: interaction,
        title: "",
        content: `**Uptime**: \`${uptime()}\``,
        ephemeral: true
    });
}



