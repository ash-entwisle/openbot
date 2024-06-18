import { Command, ECommandOption } from '../../libs/command';
import { message, EMessageType } from '../../libs/message';
import { Quotes } from 'openbot-commons';

export const data = new Command({
    name: 'quote',
    description: 'Get a random quote from the database',
    options: [],
    dmPermission: true,
    nsfw: false,
    admin: false,
    execute: execute
});

export async function execute(interaction: any) {
    

    const guildID = interaction.guild ? interaction.guild.id : 0;  

    // get a random quote from the database
    const quote = Quotes.getRandomQuote(guildID);

    console.log(quote);
        
}



