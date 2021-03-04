const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");

// Get username and room from url
const { username, room } = Qs.parse(location.search, {
  ignoreQueryPrefix: true,
});
console.log(username, room);

const socket = io();

// Join chatroom
socket.emit("joinRoom", { username, room });

socket.on("message", (message) => {
  console.log(message);
  outputMessage(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
});

chatForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const input = e.target.elements.msg;
  const msg = input.value;
  console.log(msg);

  // emit a msg to the server
  socket.emit("chatMessage", msg);
  input.value = "";
  input.focus();
});

// output message to DOM
const outputMessage = (message) => {
  const { time, text, username } = message;

  const div = document.createElement("div");
  div.classList.add("message");
  div.innerHTML = `<p class="meta">${username} <span>${time}</span></p> <p class="text">${text}</p>`;
  document.querySelector(".chat-messages").append(div);
};
