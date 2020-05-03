let socket;

function addLog(message){
    const divNode = document.createElement("div");                       // Create a <p> node
    const text = document.createTextNode(`${message}`);      // Create a text node
    divNode.appendChild(text);
    document.querySelector("#log").appendChild(divNode);
}

async function connectToWS(address) {
    socket = await window.io.connect(address);
    socket.on("loggedIn", (data) => {
        if (!data.status) {
            console.error(data.error);
            return;
        }

        token = data.token;
        document.querySelector("#auth").style.display = "none";
        document.querySelector("#actions").style.visibility = "visible";
        document.querySelector("#log").style.visibility = "visible";
        document.querySelector("#greeting").textContent = `Hey, ${data.username}!`;
        console.log("Succefully Logged in");
    });

    socket.on("error", (message) => {
        console.error("Error occurred: ", message);
    });

    socket.on("message", (data) => {
        addLog(`${data.sender}: ${data.message}`);
    });

}

function spin() {
    socket.emit("spin", {token, payload: {"message": "Spin !"}});
}

function wild(numberOfPeople) {
    socket.emit("wild", {token, payload: {"message": "Wild !", wild: numberOfPeople}});
}

function blast() {
    socket.emit("blast", {token, payload: {"message": "Blast !"}});
}

function register() {
    const username = document.querySelector("#register-username").value;
    const password = document.querySelector("#register-password").value;
    socket.emit("register", {username, password});
}

function login() {
    const username = document.querySelector("#login-username").value;
    const password = document.querySelector("#login-password").value;
    socket.emit("login", {username, password});
}
