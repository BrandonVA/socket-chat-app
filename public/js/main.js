const chatForm = document.getElementById("chat-form");
// const chatMessage;

const socket = io();

socket.on("message", (message) => {
  console.log(message);
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const msg = e.target.elements.msg.value;
  console.log(msg);

  // emit a msg to the server
  socket.emit("chatMessage", msg);
});
