import { latency } from 'openbot-commons';
import { EMessageType, message } from '../../libs/message';
import { Command, ICommandData } from '../../libs/command';
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

    message({
        type: EMessageType.Message,
        interaction: interaction,
        title: "",
        content: `**Latency:** \`${latency(interaction)}ms.\``,
        ephemeral: true
    });
}



