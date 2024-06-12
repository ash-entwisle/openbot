import { latency } from '../../libs/sysinfo';
import { EMessageType, message } from '../../libs/message';
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
    message({
        type: EMessageType.Message,
        interaction: interaction,
        title: "",
        content: `**Latency:** \`${latency(interaction)}ms.\``,
        ephemeral: true
    });
}



