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
  });

  // listen for chatMessage
  socket.on("chatMessage", (msg) => {
    const user = getCurrentUser(socket.id);
    console.log(msg);
    io.to(user.room).emit("message", formatMessage(user.username, msg));
  });

  // Runs when a Client disconnects
  socket.on("disconnect", () => {
    const user = getCurrentUser(socket.id);
    userLeave(socket.id);

    io.to(user.room).emit(
      "message",
      formatMessage(adminName, `${user.username} has left the chat`)
    );
  });
});

app.get("/", (req, res) => {
  res.send(path.join(__dirname + "/index.html"));
});

server.listen(PORT, () => console.log("Server running on port: " + PORT));

// const http = require("http").Server(app);
// const io = require("socket.io")(http);

// // Console.logs when a user is connected.
// io.on("connection", (socket) => {
//   console.log("a user connected");
//   socket.on("disconnect", () => {
//     console.log("user disconnected");
//   });
// });

// // This will emit the event to all connected sockets supposed to but doesn't work??? -look into
// io.on("connection", (socket) => {
//   socket.on("chat message", (msg) => {
//     console.log("message: " + msg);
//   });
// });

// // doesn't work?
// io.emit("some event", {
//   someProperty: "some value",
//   otherProperty: "other value",
// });

// // io.on("connection", (socket) => {
// //   socket.broadcast.emit("hi");
// // });

// // sends the sends/console.logs message
// io.on("connection", (socket) => {
//   socket.on("chat message", (msg) => {
//     io.emit("chat message", msg);
//   });
// });

// http.listen(3000, () => {
//   console.log("listening on *:3000");
// });
