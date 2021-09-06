import { io } from "./http";

interface IUserRoom {
    socket_id: string;
    username: string;
    room: string;
}

const users: IUserRoom[] = [];

io.on("connection", (socket) => {
    socket.on("select_room", (data) => {
        socket.join(data.room);

        const userInRoom = users.find(
            (user) => user.username === data.username && user.room === data.room
        );

        if (userInRoom) {
            userInRoom.socket_id = socket.id;
        } else {
            users.push({
                socket_id: socket.id,
                username: data.username,
                room: data.room,
            });
        }

        console.log(users);
    });
});
