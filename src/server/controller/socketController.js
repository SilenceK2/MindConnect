const { Server } = require("socket.io");

const socketController = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  const room = io.of("/room");
  room.on("connection", (socket) => {
    socket.join("room1");
    console.log("room접속");
  });
};

module.exports = socketController;
