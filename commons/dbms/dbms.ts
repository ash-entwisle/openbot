import Database from 'better-sqlite3';

export class DBMS {
    private static instance: Database.Database | null = null;

    private constructor() {}

    public static getInstance(): Database.Database {
        if (!DBMS.instance) {
            require("dotenv").config();

            const dbPath = process.env.DB_PATH || 'openbot.db';

            DBMS.instance = new Database(dbPath);

            DBMS.instance.pragma('journal_mode = WAL');

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

