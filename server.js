const express = require("express");
const path = require("path");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const PORT = 3000 || process.env.PORT;

// serve static folder public
app.use(express.static("public"));

// Run when a client connects
io.on("connection", (socket) => {
  console.log("New WS Connection");

  // welcomes the user
  socket.emit("message", "Welcome to Chat cord");

  // Broadcst when a user connects
  socket.broadcast.emit("message", "A user has joined the chat");

  // Runs when a Client disconnects
  socket.on("disconnect", () => {
    io.emit("message", "A user has left the chat");
  });

  // listen for chatMessage
  socket.on("chatMessage", (msg) => {
    console.log(msg);
    io.emit("message", msg);
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
