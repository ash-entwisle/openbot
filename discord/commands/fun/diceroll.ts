import { Command, ECommandOption, ICommandData } from '../../libs/command';
import { message, EMessageType } from '../../libs/message';

export const data: ICommandData = {
    name: 'diceroll',
    description: 'Rolls a Dice using standard dice notation. Example: 1d20+5',
    options: [
        {
            type: ECommandOption.StringOption,
            name: 'dice-string',
            description: 'Uses standard dice notation to roll dice. Example: 1d20+5',
            required: true,
        }
    ],
    dmPermission: true,
    nsfw: false,
    admin: false,
    execute: execute
};

export const command = new Command(data);

export async function execute(interaction: any) {
    // get the choice from the user
    const diceString = interaction.options.getString('dice-string');

    // remoe spaces
    const diceStringNoSpaces = diceString.replace(/\s/g, '');

    // split the string into an array at + or -
    const diceStringArray = diceStringNoSpaces.split(/(?=[+-])/);

    // loop through the array
    let result = 0;

    for (let i = 0; i < diceStringArray.length; i++) {
        // get the current item
        const item = diceStringArray[i];
        let temp = 0;

        // if item contains a d
        if (item.includes('d')) {
            // split the item into an array at d
            const items = item.split('d');

            // loop through the number of dice
            for (let j = 0; j < +items[0]; j++) {
                // roll the dice
                temp += Math.floor(Math.random() * +items[1]) + 1;
            }
        } else {
            // add the number to the temp
            temp += +item;
        }

        result += temp;
    }

    
        

    message({
        type: EMessageType.Message,
        interaction: interaction,
        title: `Dice Roll: ${diceString}`,
        content: `Result: ${result}`,
        ephemeral: false,
        timestamp: true
    });
        
}



