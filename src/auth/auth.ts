import jwt from "jsonwebtoken";

import publicEvents from "../config/publicEvents";
import Settings from "../config/settings";
import {findUser} from "../interface/user.interface";
import logger from "../util/logger";

const jwtSecret = Settings.get().jwtSecret;

export function generateJWT(data) {
    return jwt.sign(data, jwtSecret);
}

export function decodeJWT(token) {
    return jwt.verify(token, jwtSecret);
}

export async function verifyUserMiddleware(socket, next) {
    const [eventName, data] = socket;
    const isPublicApi = eventName in publicEvents;

    if (isPublicApi) {
        next();
        return;
    }

    try {
        if (!data.token) {
            const error = new Error("Cant authenticate, no token found.");
            logger.warn("No token found when trying to reach protected api.");
            throw error;
        }

        const decoded = decodeJWT(data.token);
        const username = decoded.username;

        // The token has been verified, find the user in it, and auth it.
        const [results] = await findUser({username});

        if (results.length != 1) {
            const error = new Error("Cant match username");
            logger.warn("Cant fin'd username to this query token", {username});
            throw error;
        }

        next();
    } catch (e) {
        next(e);
    }
};

