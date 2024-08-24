import { Logger } from './commons';
import startBot from './discord';
import startServer from './backend';
import { DBMS } from './commons/dbms/dbms';

Logger.info('initing db...');
DBMS.getInstance();

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
