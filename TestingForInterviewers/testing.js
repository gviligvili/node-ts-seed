let socket;
async function connectToWS(address) {
    socket = await window.io.connect(address);
    socket.on('loggedIn', (data) => {
        if (!data.status) {
            console.error("Failed to log in.")
        }

        token = data.token;
        console.log("Succefully Logged in");
    })

    socket.on('error', (message) => {
        console.error("Error occurred: ", message)
    })

    socket.on('message', (data) => {
        console.log("New message", data.message)
    })

    socket.emit('login', {username: "harta", password: 123});
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
