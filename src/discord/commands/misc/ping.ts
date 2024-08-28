import { latency } from '../../../commons';
import { EMessageType, send_message } from '../../../commons/discord/message';
import { Command, ICommandData } from '../../../commons/discord/command';
import { ChatInputCommandInteraction } from 'discord.js';

export const data: ICommandData = {
    name: 'ping',
    description: 'Get the latency of the bot.',
    dmPermission: true,
    nsfw: false,
    admin: false,
    execute: execute
};

export const command = new Command(data);

export async function execute(interaction: ChatInputCommandInteraction) {

    // console.log(interaction.toJSON());

    send_message({
        type: EMessageType.Message,
        interaction: interaction,
        title: "",
        content: `**Latency:** \`${latency(interaction)}ms.\``,
        ephemeral: true
    });
}



