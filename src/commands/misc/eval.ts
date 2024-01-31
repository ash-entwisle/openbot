import { message, EMessageType } from '../../libs/message';
import { Command, ECommandOption } from '../../libs/command';
import Bun from 'bun';

export const data = new Command({
    name: 'eval',
    description: 'Run an input script with an interpreter.',
    options: [
        {
            type: ECommandOption.StringOption,
            name: 'interpreter',
            description: 'Which interpreter do you want to run the script with?',
            required: true,
            choices: [
                { name: 'node', value: 'node' },
            ]
        },
        {
            type: ECommandOption.StringOption,
            name: 'script',
            description: 'The script to run.',
            required: true,
        }
    ],
    dmPermission: true,
    nsfw: false,
    admin: true,
    execute: execute
})

export async function execute(interaction: any) {

    const script = interaction.options.getString('script')
    const interpreter = interaction.options.getString('interpreter')

    let arg = "";
    let output = "";
    let md = "";

    switch (interpreter) {
        case "node":
            arg = "-e";
            md = "js";
            break;
        default:
            arg = "-e";
            break;
    }

    const startTime = Date.now();

    if (script) {
        const proc = Bun.spawn([interpreter, arg, script], {
            cwd: "./",
            env: { ...process.env },
            onExit(proc, exitCode, signalCode, error) {
                // todo: handle errors
            }
        });
    
        output = await new Response(proc.stdout).text();
    } else {
        output = "*No script provided.*";
    }

    const endTime = Date.now();
    
    message({
        type: EMessageType.Message,
        interaction: interaction,
        title: `Running with \`${interpreter}\`:`,
        content: `\`\`\`${md}\n${script} \`\`\` \n **Output:** \`\`\` ${output}\`\`\``,
        footer: `Took \`${endTime - startTime}ms\` to Execute. `,
        ephemeral: false,
        timestamp: true,
    });
}



