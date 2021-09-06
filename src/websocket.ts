import { io } from "./http";

interface IUserRoom {
    socket_id: string;
    username: string;
    room: string;
}

const users: IUserRoom[] = [];

interface IMessage {
    room: string;
    text: string;
    created_at: Date;
    username: string;
}

const messages: IMessage[] = [];

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
    });

    socket.on("message", (data) => {
        const message: IMessage = {
            room: data.room,
            text: data.message,
            username: data.username,
            created_at: new Date(),
        };

        messages.push(message);

        console.log(messages);

        io.to(data.room).emit("message", message);
    });
});
