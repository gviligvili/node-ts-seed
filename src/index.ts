import {startServer} from "./server";

/** Preload logic, insert here everything needs to be established before exposing the server.*/
async function BootstrapLogic() {

}

async function start() {
    await BootstrapLogic();
    await startServer();
}

start();
