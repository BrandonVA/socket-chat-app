const express = require("express");
const path = require("path");
const app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(path.join(__dirname + "/index.html"));
});

// Console.logs when a user is connected.
io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// This will emit the event to all connected sockets supposed to but doesn't work??? -look into
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
});

// doesn't work?
io.emit("some event", {
  someProperty: "some value",
  otherProperty: "other value",
});

// io.on("connection", (socket) => {
//   socket.broadcast.emit("hi");
// });

// sends the sends/console.logs message
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
