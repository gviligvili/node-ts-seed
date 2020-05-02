import {getDB} from "../config/DbConfig";
import logger from "../util/logger";

export interface registerUserInput { username: string, password:string}

export async function registerUser({ username, password}: registerUserInput) {
    let results;
    try {
         results =  await getDB().execute(`INSERT INTO users (username, password) VALUES (?,?)`, [username, password]);
    } catch (e) {
        logger.error("Unable to save user", { error: e.message});
        throw new Error('Register failed')
    }

    return results
}

export async function loginUser({ username, password}: registerUserInput) {
    let results = false;
    try {
        const [rows, fields] =  await getDB().execute(`SELECT * FROM users where username = ? AND password = ?`, [username, password]);
        if (rows.length === 1) {
            return true;
        }
    } catch (e) {
        logger.error("Unable to save user", { error: e.message});
        throw new Error('Register failed')
    }

    return results
}
