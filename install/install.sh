# make directory for openbot
echo "Making directory..."
mkdir -p $(pwd)/openbot
cd $(pwd)/openbot

# get config file
echo "Downloading config file..."
curl -fsSL https://raw.githubusercontent.com/ash-entwisle/openbot/main/install/bot-config.json > config.json

# get env file
echo "Fetching enviroment variables"
echo "DISCORD_TOKEN=your_token" > .env
echo "DISCORD_ID=your_bot_id" >> .env
echo "" >> .env
echo "# === DO NOT CHANGE ANYTHING BELOW THIS LINE ===" >> .env
echo "BOT_CONFIG=config.json" >> .env

# get docker-compose file
echo "Downloading docker-compose file..."
curl -fsSL https://raw.githubusercontent.com/ash-entwisle/openbot/main/docker-compose.yml > docker-compose.yml

# get license file
echo "Fetching license..."
curl -fsSL https://raw.githubusercontent.com/ash-entwisle/openbot/main/LICENSE > LICENSE

# get readme file
echo "Fetching readme..."
curl -fsSL https://raw.githubusercontent.com/ash-entwisle/openbot/main/README.md > README.md

echo "Done!"
echo "To start the bot, first edit the .env file with your bot's token and id."
echo "Then run 'docker compose up' in the openbot directory."
echo "To stop the bot, run 'docker compose down' in the openbot directory."
echo "For more information, see the README.md file."
echo "Any issues, feel free to open an issue on the github page: https://github.com/ash-entwisle/openbot" 

