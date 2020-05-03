import mysql from "mysql2/promise";

import logger from "../util/logger";
import Settings from "./settings";

const dbConfig = Settings.get().db;
let connection;

async function setUp() {
    const [rows, fields] = await connection.execute(`
        CREATE TABLE IF NOT EXISTS users (
          username varchar(10) UNIQUE NOT NULL,       
          password varchar(250)  NOT NULL,     
          PRIMARY KEY  (username)
        );
    `);
}

export async function connectToDB() {
    logger.info("[dbConfig] trying to connect to MySQL");
    try {
        connection = await mysql.createConnection({
            host: dbConfig.host,
            user: dbConfig.user,
            password: dbConfig.password,
            database: dbConfig.database
        });
        await setUp();
        logger.info("[dbConfig] Connected to MySql successfully");
    } catch (e) {
        logger.error(`[dbConfig] Failed to connect to MySql: ${e.message}`, {
            error: e
        });
        throw e;
    }
}

export function getDB() {
    return connection;
}
