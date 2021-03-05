const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 3000 || process.env.PORT;

// serve static folder public
app.use(express.static("public"));

const adminName = "AI";

// Run when a client connects
io.on("connection", (socket) => {
  // Listens for when a user joins the room
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);

    // joins a user to their room
    socket.join(user.room);

    // welcomes the user
    socket.emit("message", formatMessage(adminName, "Welcome to Chat cord"));

    // Broadcast when a user connects
    socket.broadcast
      .to(user.room)
      .emit(
        "message",
        formatMessage(adminName, `${user.username} has joined the chat`)
      );
    //send user and room info
    io.to(user.room).emit("roomUsers", {
      room: user.room,
      users: getRoomUsers(user.room),
    });
  });

  // listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Runs when a Client disconnects
  socket.on("disconnect", () => {
    const user = getCurrentUser(socket.id);
    userLeave(socket.id);

    if (user) {
      // notify user when another user leaves
      io.to(user.room).emit(
        "message",
        formatMessage(adminName, `${user.username} has left the chat`)
      );
      // update room and users
      io.to(user.room).emit("roomUsers", {
        room: user.room,
        users: getRoomUsers(user.room),
      });
    }
  });
});

app.get("/", (req, res) => {
  res.send(path.join(__dirname + "/index.html"));
});

server.listen(PORT, () => console.log("Server running on port: " + PORT));
