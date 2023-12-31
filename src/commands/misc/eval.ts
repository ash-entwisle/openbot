import { latency } from '../../libs/sysinfo';
import { embed, message } from '../../libs/reply';
import { Command, ECommandOption } from '../../libs/command';

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
                { name: 'python', value: 'python' },
                { name: 'sh', value: 'sh'},
                { name: 'lua', value: 'lua'}
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

    // this command is currently disabled, if you want to use it, uncomment the code below, remove the message at the end and uncomment the dependencies in the dockerfile

// 
//     const script = interaction.options.getString('script')
//     const interpreter = interaction.options.getString('interpreter')
// 
//     let arg = "";
//     let output = "";
//     let md = "";
// 
//     switch (interpreter) {
//         case "node":
//             arg = "-e";
//             md = "js";
//             break;
//         case "python":
//             arg = "-c";
//             md = "py";
//             break;
//         case "sh":
//             arg = "-c";
//             md = "sh";
//             break;
//         case "lua":
//             arg = "-e";
//             md = "lua";
//             break;
//         default:
//             arg = "-e";
//             break;
//     }
// 
//     const startTime = Date.now();
// 
//     if (script) {
//         const proc = Bun.spawn([interpreter, arg, script], {
//             cwd: "./",
//             env: { ...process.env },
//             onExit(proc, exitCode, signalCode, error) {
//                 // todo: handle errors
//             }
//         });
//     
//         output = await new Response(proc.stdout).text();
//     } else {
//         output = "*No script provided.*";
//     }
// 
//     const endTime = Date.now();
//     
//     embed({
//         interaction: interaction,
//         title: `Running with \`${interpreter}\`:`,
//         content: `\`\`\`${md}\n${script} \`\`\` \n **Output:** \`\`\` ${output}\`\`\``,
//         footer: `Took \`${endTime - startTime}ms\` to Execute. `,
//         ephemeral: false,
//         timestamp: true,
//     });
//
    message({
        interaction: interaction,
        content: `This command is currently disabled.`
    })
}



