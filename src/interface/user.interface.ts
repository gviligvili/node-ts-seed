import {getDB} from "../config/DbConfig";
import logger from "../util/logger";

export interface RegisterUserInput { username: string; password: string}
export interface FindUserInput { username: string }

export async function findUser({ username }: FindUserInput) {
    let results;
    try {
        results =  await getDB().execute("SELECT username FROM users WHERE username = ?", [username]);
    } catch (e) {
        logger.error("Unable to get user", { username, error: e.message});
        throw new Error("Register failed");
    }

    return results;
}

export async function registerUser({ username, password}: RegisterUserInput) {
    let results;
    try {
         results =  await getDB().execute("INSERT INTO users (username, password) VALUES (?,?)", [username, password]);
    } catch (e) {
        logger.error("Unable to save user", { error: e.message});
        throw new Error("Register failed");
    }

    return results;
}

export async function loginUser({ username, password}: RegisterUserInput) {
    const results = false;
    try {
        const [rows, fields] =  await getDB().execute("SELECT * FROM users where username = ? AND password = ?", [username, password]);
        if (rows.length !== 1) {
            throw new Error("Cant find user.");
        }
    } catch (e) {
        logger.error("Unable to find user", { error: e.message});
        throw new Error("Login failed");
    }

    return results;
}
