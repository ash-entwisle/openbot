import { ChatInputCommandInteraction, Interaction } from 'discord.js';
import { Command, ECommandOption, ICommandData } from '../../../../commons/discord/command';
import { send_message, EMessageType } from '../../../../commons/discord/message';
import { Bot } from '../../../../commons/discord/bot';
import Quote from '../../../../commons/types/quote';

export const data: ICommandData = {
    name: 'add',
    description: 'Add a new quote',
    options: [
        {
            type: ECommandOption.StringOption,
            name: 'quote',
            description: 'The quote to add',
            required: true,
        },
        {
            type: ECommandOption.StringOption,
            name: 'author',
            description: 'The author of the quote',
            required: false,
        },
        {
            type: ECommandOption.BooleanOption,
            name: 'global',
            description: 'Whether the quote is global or not (you have to be a developer to use this)',
            required: false,
        }
    ],
    dmPermission: true,
    nsfw: false,
    admin: false,
    enabled: true,
    execute: execute
};

export const command = new Command(data);

export async function execute(interaction: ChatInputCommandInteraction) {
    
    // get the choice from the user
    const quoteText = interaction.options.getString('quote');
    const author = interaction.options.getString('author');
    const global = interaction.options.getBoolean('global') || false;

    // check if the user is in the config file
    const userID = interaction.user.id;
    const adminIDs = Bot.getInstance().config.admins;

    // add the quote to the database
    const quote: Quote = {
        guildID: interaction.guild!.id || "",
        userID: interaction.user.id,
        quote: quoteText || "",
        author: author || "",
        global: global && adminIDs.includes(userID),
        timestamp: new Date().getTime()
    };

    console.log(quote);

        
}



