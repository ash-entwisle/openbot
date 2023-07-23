import { latency } from '../../libs/sysinfo';
import { embed } from '../../libs/reply';
import { Command } from '../../libs/command';

export const data = new Command({
    name: 'ping',
    description: 'Get the latency of the bot.',
    dmPermission: true,
    nsfw: false,
    admin: false,
    execute: execute
})

export async function execute(interaction: any) {
    embed({
        interaction: interaction,
        title: "",
        content: `**Latency:** \`${latency(interaction)}ms.\``,
        ephemeral: true
    });
}



