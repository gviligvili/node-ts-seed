/** Spin - send message to random user */
export const spinLogic = (socket) => {
    socket.emit('spin', { hello: 'spin' });
}

/** wild - send a message to X random users. X will be determind by the client */
export const wildLogic = (socket) => {
    socket.emit('wild', { hello: 'wild' });
}

/** blast - sends message to all users */
export const blastLogic = (socket) => {
    socket.emit('blast', { hello: 'blast' });
}

/** register - simple user registration flow */
export const registerLogic = (socket) => {
    socket.emit('register', { hello: 'register' });
}

/** login - simple login flow */
export const loginLogic = (socket) => {
    socket.emit('login', { hello: 'login' });
}
