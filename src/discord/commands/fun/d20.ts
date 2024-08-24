import { Command, ECommandOption, ICommandData } from '../../../commons/discord/command';
import { message, EMessageType } from '../../../commons/discord/message';

export const data: ICommandData = {
    name: 'd20',
    description: 'Rolls a D20',
    options: [
        {
            type: ECommandOption.IntegerOption,
            name: 'roll-modifier',
            description: 'Modifier to add to the roll',
            required: false,
        },
        {
            type: ECommandOption.StringOption,
            name: 'roll-enhancement',
            description: 'Enhancement to add to the roll',
            required: false,
            choices: [
                { name: 'advantage', value: 'advantage' },
                { name: 'disadvantage', value: 'disadvantage' }
            ]
        }
    ],
    dmPermission: true,
    nsfw: false,
    admin: false,
    execute: execute
};

export const command = new Command(data);

export async function execute(interaction: any) {
    
    const rollModifier = interaction.options.getInteger('roll-modifier');
    const rollEnhancement = interaction.options.getString('roll-enhancement');

    const rollOne = Math.floor(Math.random() * 20) + 1;
    const rollTwo = Math.floor(Math.random() * 20) + 1;

    let result = 0;

    switch (rollEnhancement) {
        case 'advantage':
            result = Math.max(rollOne, rollTwo);
            break;
        case 'disadvantage':
            result = Math.min(rollOne, rollTwo);
            break;
        default:
            result = rollOne;
            break;
    }

    result += +rollModifier;

    message({
        type: EMessageType.Message,
        interaction: interaction,
        title: `Dice Roll: 1d20${rollModifier ?? ""} ${rollEnhancement ? `(with ${rollEnhancement})` : ""}`,
        content: `Result: ${result}`,
        ephemeral: false,
        timestamp: true
    });
        
}



