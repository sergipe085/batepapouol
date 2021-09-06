import { io } from "./http";

io.on("connection", (socket) => {
    socket.on("select_room", (data) => {
        console.log(data);
    });
});
