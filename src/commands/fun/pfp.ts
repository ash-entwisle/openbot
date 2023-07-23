import { Command, ECommandOption } from '../../libs/command';
import { message } from '../../libs/reply';

export const data = new Command({
    name: 'pfp',
    description: 'gets the Profile Picture of a user',
    options: [
        {
            type: ECommandOption.UserOption,
            name: 'user',
            description: 'The user to get the profile picture of',
            required: false
        }
    ],
    dmPermission: true,
    nsfw: false,
    admin: false,
    execute: execute
});

export async function execute(interaction: any) {
    const user = interaction.options.getUser('user') ?? interaction.user;
    const avatar = user.displayAvatarURL({ dynamic: true, size: 4096 });
    message({
        interaction: interaction,
        content: `**<@${user.id}>'s** Profile Picture\n${avatar}`,
        ephemeral: true
    });
}



