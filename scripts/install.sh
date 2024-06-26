# make directory for openbot
echo "Making directory..."
mkdir -p $(pwd)/openbot
cd $(pwd)/openbot

# get config file
echo "Downloading config file..."
curl -fsSL https://raw.githubusercontent.com/ash-entwisle/openbot/main/scripts/bot-config.toml > config.toml

# get env file
echo "Fetching enviroment variables"
curl -fsSL https://raw.githubusercontent.com/ash-entwisle/openbot/main/scripts/example.env > .env

# get docker-compose file
echo "Downloading docker-compose file..."
curl -fsSL https://raw.githubusercontent.com/ash-entwisle/openbot/scripts/docker-compose.yaml > docker-compose.yaml

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

