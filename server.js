const express = require("express");
const app = express();

const PORT = process.env.PORT || 3001;

const server = require("http").Server(app); // http.createServer(app);

const io = require("socket.io")(server);

const path = require("path");

// Send every request to the React app
// Define any API routes before this runs
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

// app.listen(PORT, function () {
//   console.log(`🌎 ==> API server now on port ${PORT}!`);
// });

const formatMessage = require("./utils/messages");
const {
  userJoin,
  getCurrentUser,
  userLeave,
  getRoomUsers,
} = require("./utils/users");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

const adminName = "Socket Bot";

// Run when a client connects
io.sockets.on("connection", (socket) => {
  console.log("connected to socket io");

  // Listens for when a user joins the room
  socket.on("joinRoom", ({ username, room }) => {
    const user = userJoin(socket.id, username, room);
    console.log("user joined");

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
    console.log(msg);
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
server.listen(PORT, () => console.log("Server running on port: " + PORT));
