/** Spin - send message to random user */
import _ from 'lodash';
import {loginUser, registerUser, RegisterUserInput} from "../interface/user.interface";
import {decodeJWT, generateJWT} from "../auth/auth";
import {getSocketIO} from "../services/socket.service";
import logger from "../util/logger";

export const GENERAL_ROOM = 'Lobby';

async function getRandomSocketsFromRoom(roomName: string, numberOfSockets: number, socketID: string): Promise<any> {
    /** Side note to the testers, I didn't know if to exclude the sender socket,
     * it's just sound logical that he should replay himself..
     */
    try {
        const promise = new Promise((resolve, reject) => {
            const io = getSocketIO();
            io.of('/').in(roomName).clients(function (error, clients) {
                if (error) reject(error);
                const clientsWithoutSender = clients.filter(x => x !== socketID);
                resolve(_.sampleSize(clientsWithoutSender, numberOfSockets) as string[]);
            });
        })

        const result = await promise;
        return result as string[];
    } catch (e) {
        logger.error('Cant get all client in a room.', {roomName, error: e.message});
        throw e;
    }
}

/**
 * spin - send a message to a random user.
 **/
export const spinController = async (socket, data) => {
    const {payload} = data;
    const decoded = decodeJWT(data.token);
    const username = decoded.username

    const result = await getRandomSocketsFromRoom(GENERAL_ROOM, 1, socket.id);
    const recipient = result[0]

    const io = getSocketIO();
    io.to(recipient).emit('message', {message: payload.message, sender: username})
}

/**
 * wild - send a message to X random users. X will be determind by the client
 **/
export const wildController = async (socket, data) => {
    const {payload} = data;
    const decoded = decodeJWT(data.token);
    const username = decoded.username

    const recipients = await getRandomSocketsFromRoom(GENERAL_ROOM, payload.wild, socket.id);

    recipients.forEach(rec => socket.to(rec).emit('message', {message: payload.message, sender: username}));
}

/**
 * blast - sends message to all users
 * */
export const blastController = (socket, data) => {
    const {payload} = data;
    const decoded = decodeJWT(data.token);
    const username = decoded.username;

    socket.nsp.to(GENERAL_ROOM).emit('message', {message: payload.message, sender: username});
}

/** register - simple user registration flow */
export const registerController = async (socket, input: RegisterUserInput) => {
    try {
        await registerUser(input);
        const token = generateJWT({username: input.username});

        // create jwt token.
        socket.emit('loggedIn', {"status": 1, token: token, username: input.username});
    } catch (e) {
        socket.emit('loggedIn', {status: 0, error: e.message})
    }
}

/** login - simple login flow */
export const loginController = async (socket, input: RegisterUserInput) => {
    try {
        await loginUser(input);
        const token = generateJWT({username: input.username});

        // create jwt token.
        socket.emit('loggedIn', {"status": 1, token: token, username: input.username});
    } catch (e) {
        socket.emit('loggedIn', {status: 0, error: e.message})
    }
}
