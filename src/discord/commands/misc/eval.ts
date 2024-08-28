import { Command, ECommandOption, ICommandData } from "../../../commons/discord/command";
import { EMessageType, send_message } from "../../../commons/discord/message";

export const from_url: ICommandData = {
    name: "url",
    description: "Run a script from a URL.",
    options: [
        {
            type: ECommandOption.StringOption,
            name: 'interpreter',
            description: 'Which interpreter do you want to run the script with?',
            required: true,
            choices: [
                { name: 'js', value: 'js' },
                { name: 'shell', value: 'shell' },
            ]
        },
        {
            type: ECommandOption.StringOption,
            name: 'url',
            description: 'The URL of the script to run.',
            required: true,
        }
    ],
    dmPermission: true,
    nsfw: false,
    admin: true,
    execute: execute
};

export const from_message: ICommandData = {
    name: "message",
    description: "Run a script from a message.",
    options: [
        {
            type: ECommandOption.StringOption,
            name: 'interpreter',
            description: 'Which interpreter do you want to run the script with?',
            required: true,
            choices: [
                { name: 'js', value: 'js' },
                { name: 'shell', value: 'shell' },
            ]
        },
        {
            type: ECommandOption.StringOption,
            name: 'message',
            description: 'URL of the message to run.',
            required: true,
        }
    ],
    dmPermission: true,
    nsfw: false,
    admin: true,
    execute: execute
};

export const data: ICommandData = {
    name: 'eval',
    description: 'Run an input script with an interpreter.',
    options: [
        {
            type: ECommandOption.StringOption,
            name: 'interpreter',
            description: 'Which interpreter do you want to run the script with?',
            required: true,
            choices: [
                { name: 'js', value: 'js' },
                { name: 'shell', value: 'shell' },
            ]
        },
        {
            type: ECommandOption.StringOption,
            name: 'script',
            description: 'The script to run.',
            required: true,
        }
    ],
    subcommands: [
        {
            command: new Command(from_url),
            data: from_url,
            exec: from_url.execute
        },
        {
            command: new Command(from_message),
            data: from_message,
            exec: from_message.execute
        }
    ],
    dmPermission: true,
    nsfw: false,
    admin: true,
    execute: execute
};

export async function execute(interaction: any) {

    let subcommand = interaction.options.getSubcommand() ?? "eval";
    let interpreter = interaction.options.getString('interpreter');
    let script = interaction.options.getString('script') ?? "";

    if (subcommand === "url") {
        let url = interaction.options.getString('url') ?? "";
        script = await fetch(url).then(res => res.text());
    } else if (subcommand === "message") {
        let message_url = interaction.options.getString('message') ?? "";

        // use this regex to check if valid: ^https://discord\.com/channels/\d+/\d+/\d+$
        if (!message_url.match(/^https:\/\/discord\.com\/channels\/\d+\/\d+\/\d+$/)) {
            send_message({
                type: EMessageType.Message,
                interaction: interaction,
                content: "Invalid message URL.",
                ephemeral: true
            });
            return;
        }

        // get channel and message id from url `https://discord.com/channels/x/<channel_id>/<message_id>`
        let [_, __, channel_id, message_id] = message_url.split("/");

        let channel = interaction.client.channels.cache.get(channel_id);
        
        if (!channel) {
            send_message({
                type: EMessageType.Message,
                interaction: interaction,
                content: "Invalid channel ID.",
                ephemeral: true
            });
            return;
        }

    }
}



