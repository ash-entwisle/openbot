import Database from 'bun:sqlite';

export class DBMS {
    private static instance: Database | null = null;

    private constructor() {}

    public static getInstance(): Database {
        if (!DBMS.instance) {

            const dbPath = process.env.OPENBOT_DB_PATH || 'openbot.db';

            DBMS.instance = new Database(dbPath);

            DBMS.instance.exec("PRAGMA journal_mode = WAL;");

            // TODO: move queries to a query builder

            // TODO: for will
            // DBMS.instance.exec(`
            //     CREATE TABLE IF NOT EXISTS jokes (
            //         guildID INTEGER,
            //         userID INTEGER,
            //         joke TEXT,
            //         answer TEXT,
            //         global INTEGER
            //     )
            // `);

            DBMS.instance.exec(`
                CREATE TABLE IF NOT EXISTS quotes (
                    guildID TEXT,
                    userID TEXT,
                    quote TEXT,
                    author TEXT,
                    global INTEGER
                )
            `);
        }
        return DBMS.instance;
    }
}

