/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const socket = io("http://localhost:3333");

const urlSearch = new URLSearchParams(window.location.search);

const username = urlSearch.get("username");
const room = urlSearch.get("select_room");

const messages_container = document.getElementById("messages_container");

const usernameDiv = document.getElementById("username");

usernameDiv.innerHTML = `Ola ${username} - Voce esta na sala ${room}`;

document.getElementById("logout").addEventListener("click", (event) => {
    window.location.href = "index.html";
});

function addMessage(data) {
    const newMessage = document.createElement("div");
    newMessage.className = "new_message";
    newMessage.innerHTML = `
        <label class="form-label">
            <strong> ${data.username} </strong> <span> ${data.text} - ${dayjs(
        data.created_at
    ).format("DD/MM HH:mm")} </span>
        </label>`;

    messages_container.appendChild(newMessage);
}

socket.emit(
    "select_room",
    {
        username,
        room,
    },
    (res) => {
        res.forEach((message) => addMessage(message));
    }
);

socket.on("message", (data) => {
    addMessage(data);
});

document
    .getElementById("message_input")
    .addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            const message = event.target.value;
            // eslint-disable-next-line no-param-reassign
            event.target.value = "";

            const data = {
                room,
                message,
                username,
            };

            socket.emit("message", data);
        }
    });
