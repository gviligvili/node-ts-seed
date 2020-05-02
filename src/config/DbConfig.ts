import mysql from 'mysql2/promise';

import logger from "../util/logger";
import Settings from "./settings";

const dbConfig = Settings.get().db;

export class DbConfig {
    static async connect() {
        logger.info("[dbConfig] trying to connect to MySQL");
        try {
            await mysql.createConnection({
                host: dbConfig.host,
                user: dbConfig.user,
                password: dbConfig.password,
                database: dbConfig.database
            });

            logger.info("[dbConfig] Connected to MySql successfully");
        } catch (e) {
            logger.error(`[dbConfig] Failed to connect to MySql: ${e.message}`, {
                error: e
            });
            throw e;
        }
    }
}
