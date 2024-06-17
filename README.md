
# openbot


I got bored over the summer, so I decided to learn typescript by making a discord bot. 

## Features

So far, the bot has limited functionality. However, 
I plan to add more features in the future when I have time. 
Currently, the bot can:

- get a users avatar
- get the latency of the bot
- get the uptime of the bot

### Roadmap

So far, I have nothing planned, but I will add more features as I think of them. 
If you have any ideas, feel free to open an issue or make a pull request.

## Usage

I am not currently hosting the bot, but if I do, I will add a link to invite the bot to your server. 
If you want to host it yourself, follow the steps below. 
To run it, you will need to have [Docker](https://www.docker.com/) installed on a linux machine. 
So far, I have tested it on Debian and Arch, it *should* work on wsl and other distros, but YMMV.  

### From Docker

Run the install script:

```sh
curl -fsSL https://raw.githubusercontent.com/ash-entwisle/openbot/main/scripts/install.sh | sh
```

then edit the `.env`

```sh
nano .env
```

Then edit the `config.toml` file:  

```sh
nano config.toml
```

and start the docker containers:

```sh
docker compose up -d
```


## Contributing

If you want to contribute, feel free to fork the repo and make a pull request. 
If you have any questions, feel free to open an issue.  

## Adding a command

To add a command, create a file in a folder in `src/commands/` with the name of the command.
For example, if you wanted to add a command called `ping`, you would create a file called `ping.ts` in `src/commands/misc`.
Then, add the following code to the file:

```ts
import { latency } from '../../libs/sysinfo';
import { embed } from '../../libs/reply';
import { Command } from '../../libs/command';

export const data = new Command({
    name: 'ping',
    description: 'Get the latency of the bot.',
    dmPermission: true,
    nsfw: false,
    admin: false,
    execute: execute
})

export async function execute(interaction: any) {
    embed({
        interaction: interaction,
        title: "",
        content: `**Latency:** \`${latency(interaction)}ms.\``,
        ephemeral: true
    });
}
```

First, import all the libraries you need.
Then, create and export a `Command` object with the properties found in the interface `ICommandData` (found in ./src/libs/command.ts).
Then, export an `execute` function that takes an `interaction` object as an argument, this will be used to collect and format data, and send a reply.  

## License

Distriuted under the AGPL-3.0 License. See `LICENSE` for more information.
