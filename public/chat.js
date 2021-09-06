// eslint-disable-next-line no-undef
const socket = io("http://localhost:3333");

const urlSearch = new URLSearchParams(window.location.search);

const username = urlSearch.get("username");
const room = urlSearch.get("select_room");

socket.emit("select_room", {
    username,
    room,
});

socket.on("message", (data) => {
    console.log(data);
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

console.log(username, room);
