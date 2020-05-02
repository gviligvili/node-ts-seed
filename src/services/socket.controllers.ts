/** Spin - send message to random user */
import {loginUser, registerUser, registerUserInput} from "../interface/user.interface";
import jwt from 'jsonwebtoken';
export const spinController = (socket) => {
    socket.emit('spin', {hello: 'spin'});
}

/** wild - send a message to X random users. X will be determind by the client */
export const wildController = (socket) => {
    socket.emit('wild', {hello: 'wild'});
}

/** blast - sends message to all users */
export const blastController = (socket) => {
    socket.emit('blast', {hello: 'blast'});
}

/** register - simple user registration flow */
export const registerController = async (socket, input: registerUserInput) => {
    try {
        await registerUser(input);
        const token = jwt.sign({ username: input.username }, 'topsecret');

        // create jwt token.
        socket.emit('loggedIn', {"status": 1, token: token});
    } catch (e) {
        socket.emit('loggedIn', { status: 0, error: e.message})
    }
}

/** login - simple login flow */
export const loginController = async (socket, input: registerUserInput) => {
    try {
        await loginUser(input);
        const token = jwt.sign({ username: input.username }, 'topsecret');

        // create jwt token.
        socket.emit('loggedIn', {"status": 1, token: token});
    } catch (e) {
        socket.emit('loggedIn', { status: 0, error: e.message})
    }
}
