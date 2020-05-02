import SocketIO from 'socket.io';
import {blastLogic, loginLogic, registerLogic, spinLogic, wildLogic} from "./socket.interface";

let _io;

export function initSocket(app: any) {
    if (_io) {
        throw new Error('Trying to reregister SocketIO')
    }
    _io = SocketIO(app)
}

export function startSocketListening() {
    /** Spin - send message to random user */
    _io.on('connection', (socket) => {
        socket.emit('connection', { "msg": "hey"})
    });

    /** wild - send a message to X random users. X will be determind by the client */
    _io.on('wild', wildLogic);

    /** blast - sends message to all users */
    _io.on('blast', blastLogic);

    /** register - simple user registeration flow */
    _io.on('register', registerLogic);

    /** login - simple login flow */
    _io.on('login', loginLogic);
}
