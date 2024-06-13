import { Logger } from 'openbot-commons/logger';
import startBot from 'openbot-discord';
import startServer from 'openbot-backend';


Logger.info('Starting bot and server...');

Logger.info('spawning server...');
startServer();

Logger.info('spawning bot...');
startBot();


Logger.info('Bot and server started');


process.on("SIGINT", () => {
    Logger.info("Shutting down...");
    process.exit(0);
});
