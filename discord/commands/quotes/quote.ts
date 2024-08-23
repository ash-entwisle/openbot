import { Command, ECommandOption, ICommandData } from '../../libs/command';
import { message, EMessageType } from '../../libs/message';
import { Quotes } from 'openbot-commons';
import "./add";
import { CommandInteraction } from 'discord.js';

export const data: ICommandData = {
    name: 'quote',
    description: 'Get a random quote from the database',
    options: [],
    subcommands: [
        {
            command: new Command(require('./add').data),
            data: require('./add').data,
            exec: require('./add').execute
        } 
    ],
    dmPermission: true,
    nsfw: false,
    admin: false,
    execute: execute
};

export const command = new Command(data);

export async function execute(interaction: any) {

    // find the subcommand name in data.subcommands and call exec
    data.subcommands!.forEach((subcommand) => {
        if (subcommand.data.name === interaction.options.getSubcommand()) {
            subcommand.exec(interaction);
        }
    });


    // const guildID = interaction.guild ? interaction.guild.id : 0;  

    // // get a random quote from the database
    // const quote = Quotes.getRandomQuote(guildID);

    // console.log(quote);
        
}



