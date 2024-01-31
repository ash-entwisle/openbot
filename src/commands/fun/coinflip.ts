import { Command, ECommandOption } from '../../libs/command';
import { embed } from '../../libs/reply';

export const data = new Command({
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
});

export async function execute(interaction: any) {
    const choice = interaction.options.getString('choice');
    const question = interaction.options.getString('question');

    // get the result of the coinflip
    const result = Math.random() < 0.5 ? 'heads' : 'tails';

    let response; if (question) response = `You asked: ${question}\n`;

    embed({
        interaction: interaction,
        title: 'Coinflip',
        content: `${response}${choice? `You guessed **${choice}**,` : "" } The coin landed on **${result}**. ${choice ? `You were ${choice === result ? 'correct !!' : 'incorrect :('}`: "" }`,
        ephemeral: false,
        timestamp: false
    });
        
}



