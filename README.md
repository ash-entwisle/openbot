# Archived

> This project has moved [here](https://github.com/ash-entwisle/openbot-rs). It *should* still work for the time being, but im no longer going to maintain it.  

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
curl -fsSL https://raw.githubusercontent.com/ash-entwisle/openbot/main/install/install.sh | sh
```

then edit the `.env` and the `config.json` file:  

```sh
nano .env

nano config.json
```

and start the docker containers:

```sh
docker compose up -d
```

### From Source (running with bun)

Clone the repo:

```sh
git clone https://github.com/ash-entwisle/openbot.git
```

then install the dependencies:

```sh
bun install
```

create a `.env` file  

```sh
touch .env
```

and then add the following:

```sh
DISCORD_TOKEN=your_discord_bot_token
DISCORD_ID=your_discord_bot_id
```

edit the `config.json` file:  

```sh
nano config.json
```

and start the bot:

```sh
bun start
```

### From Source (running with docker)

Clone the repo:

```sh
git clone https://github.com/ash-entwisle/openbot.git
```

create a `.env` file  

```sh
touch .env
```

and then the following:

```sh
DISCORD_TOKEN=your_discord_bot_token
DISCORD_ID=your_discord_bot_id
```

then edit the `config.json` file:  

```sh
nano config.json
```

then build the docker image:

```sh
bun docker 
```

and then start the docker containers:

```sh
docker compose up -d
```

## Contributing

If you want to contribute, feel free to fork the repo and make a pull request. 
If you have any questions, feel free to open an issue.  

## License

Distriuted under the AGPL-3.0 License. See `LICENSE` for more information.
