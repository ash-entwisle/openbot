import { Command, ECommandOption, ICommandData } from '../../../commons/discord/command';
import { EMessageType, send_message } from '../../../commons/discord/message';

export const data: ICommandData = {
    name: 'coinflip',
    description: 'Flips a coin',
    options: [
        {
            type: ECommandOption.StringOption,
            name: 'choice',
            description: 'Guess the outcome of the coinflip',
            required: false,
            choices: [
                { name: 'heads', value: 'heads' },
                { name: 'tails', value: 'tails' }
            ]
        }, {
            type: ECommandOption.StringOption,
            name: 'question',
            description: 'What do you want to ask the coin?',
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
    const choice = interaction.options.getString('choice');
    const question = interaction.options.getString('question');

    // get the result of the coinflip
    const result = Math.random() < 0.5 ? 'heads' : 'tails';

    let response = "";
    if (question) response = `You asked: ${question}\n**heads** means yes, **tails** means no.\n`;

    send_message({
        type: EMessageType.Message,
        interaction: interaction,
        title: 'Coinflip',
        content: `${response}${choice? `You guessed **${choice}**,` : "" } The coin landed on **${result}**. \n${choice ? `You were ${choice === result ? 'correct !!' : 'incorrect :('}`: "" }`,
        ephemeral: false,
        timestamp: false
    });
        
}



