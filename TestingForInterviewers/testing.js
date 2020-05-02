let socket;

async function connectToWS(address) {
    socket = await window.io.connect(address);
    socket.on('loggedIn', (data) => {
        if (!data.status) {
            console.error(data.error);
            return;
        }

        token = data.token
        document.querySelector('#actions').style.visibility = "visible";
        console.log("Succefully Logged in");
    })

    socket.on('error', (message) => {
        console.error("Error occurred: ", message)
    })

    socket.on('message', (data) => {
        console.log("New message", data.message)
    })

}

function spin() {
    socket.emit('spin', {token, payload: {"message": `Spin message from ${socket.id}`}});
}

function wild(numberOfPeople) {
    socket.emit('wild', {token, payload: {"message": `Wild message from ${socket.id}.`, wild: numberOfPeople}});
}

function blast() {
    socket.emit('blast', {token, payload: {"message": `Blast from ${socket.id} !`}});
}

function register() {
    const username = document.querySelector('#register-username').value
    const password = document.querySelector('#register-password').value
    socket.emit('register', {username, password});
}

function login() {
    const username = document.querySelector('#login-username').value
    const password = document.querySelector('#login-password').value
    socket.emit('login', {username, password});
}
