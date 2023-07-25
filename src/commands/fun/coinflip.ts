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
        }
    ],
    dmPermission: true,
    nsfw: false,
    admin: false,
    execute: execute
});

export async function execute(interaction: any) {
    // get the choice from the user
    const choice = interaction.options.getString('choice');

    // get the result of the coinflip
    const result = Math.random() < 0.5 ? 'heads' : 'tails';

    embed({
        interaction: interaction,
        title: 'Coinflip',
        content: `${choice? `You guessed **${choice}**,` : "" } The coin landed on **${result}**. ${choice ? `You were ${choice === result ? 'correct !!' : 'incorrect :('}`: "" }`,
        ephemeral: false,
        timestamp: false
    });
        
}



