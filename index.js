require("dotenv").config();

const { Server, Socket } = require("socket.io");

const io = new Server({
  cors: {
    origin: "*",
  },
  transports: ["websocket"],
});

let likes = 0;
io.on("connection", (socket) => {
  socket.on("likeupdate", () => {
    socket.emit("likeupdate", likes);
  });

  socket.on("liked", (sessionIDFromUrl) => {
    const sessionIdFromServer = sessionIDFromUrl;
    console.log(sessionIdFromServer);
    likes++;
    socket.emit("likeupdate", likes, sessionIdFromServer);
    socket.broadcast.emit("likeupdate", likes, sessionIdFromServer);
  });
});

const PORT = process.env.PORT || 3000;
console.log(`Server is running on port ${PORT}`);
console.log("likes", likes);
io.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
