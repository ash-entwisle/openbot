import Quote from '../types/quote';
import { DBMS } from './dbms';

export class Quotes {
    public static addQuote(quote: Quote) {
        const db = DBMS.getInstance();
        const stmt = db.prepare(`INSERT INTO quotes (guildID, userID, quote, author, global, timestamp) VALUES (?, ?, ?, ?, ?, ?)`);
        stmt.run(quote.guildID, quote.userID, quote.quote, quote.author, quote.global, quote.timestamp);
    }

    public static getRandomQuote(guildID: string, includeGlobal: boolean = true): Quote {
        
        const db = DBMS.getInstance();
        const stmt = db.prepare(`SELECT * FROM quotes WHERE guildID = ? OR global = 1 ORDER BY RANDOM() LIMIT 1`);
        const raw = stmt.get(guildID) as Quote;

        return {
            guildID: raw.guildID,
            userID: raw.userID,
            quote: raw.quote,
            author: raw.author,
            global: raw.global,
            timestamp: raw.timestamp
        };
    }

    public static getQuotes(guildID: string, includeGlobal: boolean = true): Quote[] {

        const db = DBMS.getInstance();
        const stmt = db.prepare(`SELECT * FROM quotes WHERE guildID = ? OR global = 1`);
        const raw = stmt.all(guildID);

        return raw.map((quote: any) => {
            return {
                guildID: quote.guildID,
                userID: quote.userID,
                quote: quote.quote,
                author: quote.author,
                global: quote.global,
                timestamp: quote.timestamp
            }
        });
    }

    public static deleteQuote(guildID: string, userID: string, quote: string) {
        const db = DBMS.getInstance();
        const stmt = db.prepare(`DELETE FROM quotes WHERE guildID = ? AND userID = ? AND quote = ?`);
        stmt.run(guildID, userID, quote);
    }
}
