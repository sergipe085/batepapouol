// eslint-disable-next-line no-undef
const socket = io("http://localhost:3333");

const urlSearch = new URLSearchParams(window.location.search);

const username = urlSearch.get("username");
const room = urlSearch.get("select_room");

socket.emit("select_room", {
    username,
    room,
});

console.log(username, room);
