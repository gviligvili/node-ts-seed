import {startServer} from "./server";
import {initSocket, startSocketListening} from "./services/socket.service";
import {connectToDB} from "./config/DbConfig";

/** Preload logic, insert here everything needs to be established before exposing the server.*/
async function BootstrapLogic() {
    await connectToDB();
}

export async function start() {
    await BootstrapLogic();
    const server = await startServer();
    initSocket(server);
    await startSocketListening();
}

start();
