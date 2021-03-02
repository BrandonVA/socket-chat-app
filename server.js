// // const express = require("express");
// const path = require("path");
// // const app = express();
// // // const http = require("http").createServer(app);
// // const io = require("socket.io")(app);

// const express = require("express");
// const app = express();
// const http = require("http").Server(app);
// const io = require("socket.io")(http);

// app.use(express.static("public"));

// app.get("/", (req, res) => {
//   res.send(path.join(__dirname + "/index.html"));
// });

// io.on("connection", (socket) => {
//   console.log("a user connected");
// });

// app.listen(3000, () => {
//   console.log("listening on http://localhost:3000/");
// });
// const app = require("express")();

const express = require("express");
const path = require("path");
const app = express();

const http = require("http").Server(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send(path.join(__dirname + "/index.html"));
  //   res.sendFile(__dirname + "/index.html");
});

// io.on("connection", (socket) => {
//   console.log("a user connected");
// });

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

// This will emit the event to all connected sockets
io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    console.log("message: " + msg);
  });
});

io.emit("some event", {
  someProperty: "some value",
  otherProperty: "other value",
});

// io.on("connection", (socket) => {
//   socket.broadcast.emit("hi");
// });

io.on("connection", (socket) => {
  socket.on("chat message", (msg) => {
    io.emit("chat message", msg);
  });
});

http.listen(3000, () => {
  console.log("listening on *:3000");
});
