import { message, EMessageType } from '../../../commons/discord/message';
import { Command, ECommandOption, ICommandData } from '../../../commons/discord/command';

export const data: ICommandData = {
    name: 'message',
    description: 'Sends a message as the bot.',
    options: [
        {
            type: ECommandOption.StringOption,
            name: 'message',
            description: 'The message to send.',
            required: true,
        }, {
            type: ECommandOption.BooleanOption,
            name: 'ephemeral',
            description: 'Whether the message should be ephemeral.',
            required: false,
        }, {
            type: ECommandOption.BooleanOption,
            name: 'reply',
            description: 'Whether the message should be a reply to the original message.',
            required: false,
        }
    ],
    dmPermission: true,
    nsfw: false,
    admin: false,
    execute: execute
};

export const command = new Command(data);

export async function execute(interaction: any) {
    const text = interaction.options.getString('message');
    const ephemeral = interaction.options.getBoolean('ephemeral');
    const reply = interaction.options.getBoolean('reply');

    message({
        type: EMessageType.Message,
        interaction: interaction,
        content: text,
        ephemeral: ephemeral,
        noreply: reply
    });
}



