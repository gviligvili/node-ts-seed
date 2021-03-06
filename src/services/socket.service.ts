import SocketIO from "socket.io";
import redisAdapter from "socket.io-redis";
import {
    blastController,
    GENERAL_ROOM,
    loginController,
    registerController,
    spinController,
    wildController
} from "../controllers/socket.controllers";
import Settings from "../config/settings";
const redisConfig = Settings.get().redis;
import {verifyUserMiddleware} from "../auth/auth";

let _io;


export function initSocket(app: any) {
    if (_io) {
        throw new Error("Trying to re-register SocketIO");
    }
    _io = SocketIO(app);
    _io.adapter(redisAdapter({ host: redisConfig.host, port: redisConfig.port}));
}

export function startSocketListening() {
    _io.on("connection", (socket) => {
        socket.join(GENERAL_ROOM);

        socket.use(verifyUserMiddleware);

        /** register - simple user registeration flow */
        socket.on("register", registerController.bind(this, socket));

        /** login - simple login flow */
        socket.on("login", loginController.bind(this, socket));

        /** Spin - send message to random user */
        socket.on("spin", spinController.bind(this, socket));

        /** wild - send a message to X random users. X will be determind by the client */
        socket.on("wild", wildController.bind(this, socket));

        /** blast - sends message to all users */
        socket.on("blast", blastController.bind(this, socket));
    });
}

export function getSocketIO() {
    return _io;
}
