import {UrlRecord} from "@server/db/models/url-record";
import {Dao} from "@server/db/dao";
import {Pool} from "pg";
import fs from "fs";

const pool: Pool = new Pool({
    host: process.env.SQL_HOST ?? '127.0.0.1',
    database: process.env.SQL_DB,
    user: process.env.SQL_USER,
    password: process.env.SQL_PASS,
    port: process.env.SQL_PORT ? +process.env.SQL_PORT : 5432, // NaN defaults to 5432
    max: 10, // Create a pool of 10 database connections to be used throughout the rest of the application.
    idleTimeoutMillis: 30000,
});

const initialize = async (): Promise<boolean> => {
    if(!(await isDbConnected()))
        return false;

    if(await isDbEmpty())
        await pool.query(`${await fs.promises.readFile(`${__dirname}/migrations/url.sql`)}`);
    return true;
};

const isDbConnected = async (): Promise<boolean> => {
    try{
        await pool.query(`SELECT 1;`);
        return true;
    } catch {
        return false;
    }
};

const isDbEmpty = async (): Promise<boolean> => {
    try{
        await pool.query(`SELECT EXISTS (SELECT * FROM url);`);
        return false;
    } catch {
        return true;
    }
};

const insertUrl = async (longUrl: string, shortUrl: string): Promise<UrlRecord> => {
    const sql = `INSERT INTO url(short_url, long_url) values($1, $2) returning id;`;
    const res = await pool.query(sql, [shortUrl, longUrl]);
    const id = res.rows[0]?.id ?? -1;
    return <UrlRecord> {id: id, shortUrl: shortUrl, longUrl: longUrl};
};

const getRecentUrls = async (count: number): Promise<UrlRecord[]> => {
    const sql = `SELECT id, short_url as "shortUrl", long_url as "longUrl" FROM url ORDER BY id DESC LIMIT $1;`;
    const res = await pool.query(sql, [count]);
    return <UrlRecord[]> res.rows;
};

const getLongUrl = async(shortUrl: string): Promise<string> => {
    const sql = `SELECT long_url as "longUrl" FROM url WHERE short_url=$1;`;
    const res = await pool.query(sql, [shortUrl]);
    return (<UrlRecord[]> res.rows)[0]?.longUrl;
};

export default <Dao> {
    initialize,
    insertUrl,
    getRecentUrls,
    getLongUrl
};