// import "./App.css";
// import React, { useState, useEffect, useRef } from "react";
// import { io } from "socket.io-client";
// // import { useParams } from "react-router-dom";

// function App() {
//   // const chatForm = document.getElementById("chat-form");
//   // const chatMessages = document.querySelector(".chat-messages");
//   // const roomName = document.getElementById("room-name");
//   const userList = document.getElementById("users");

//   const [roomName, setRoomName] = useState("");
//   const [chat, setChat] = useState([]);
//   const socketRef = useRef();

//   // output message to DOM
//   const outputMessage = (message) => {
//     const { time, text, username } = message;

//     const div = document.createElement("div");
//     div.classList.add("message");
//     div.innerHTML = `<p class="meta">${username} <span>${time}</span></p> <p class="text">${text}</p>`;
//     // document.querySelector(".chat-messages").append(div);
//     const arr = [...chat, div];
//     setChat(arr);
//   };

//   const outputRoomName = (room) => {
//     roomName.innerText = room;
//     setRoomName(room);
//   };

//   const outputUsers = (users) => {
//     userList.innerHTML = `
//   ${users.map((user) => `<li>${user.username}</li>`).join("")}
//   `;
//   };

//   useEffect(() => {
//     socketRef.current = io();
//     // const test = io();
//     const username = "brandon";
//     const room = "javascript";

//     // Join chatroom
//     socketRef.current.emit("joinRoom", { username, room });

//     socketRef.current.on("roomUsers", ({ room, users }) => {
//       outputRoomName(room);
//       outputUsers(users);
//     });

//     socketRef.current.on("message", (message) => {
//       console.log(message);
//       outputMessage(message);
//       // chatMessages.scrollTop = chatMessages.scrollHeight;
//     });
//     // eslint-disable-next-line
//   }, [chat]);

//   // const socket = io("http:localhost:3002");
//   // const username = "brandon";
//   // const room = "javascript";

//   // // get room and users
//   // socket.on("roomUsers", ({ room, users }) => {
//   //   outputRoomName(room);
//   //   outputUsers(users);
//   // });

//   // socket.on("message", (message) => {
//   //   console.log(message);
//   //   outputMessage(message);
//   //   chatMessages.scrollTop = chatMessages.scrollHeight;
//   // });

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const input = e.target.elements.msg;
//     const msg = input.value;
//     console.log(msg);

//     // emit a msg to the server
//     socketRef.current.emit("chatMessage", msg);
//     input.value = "";
//     input.focus();
//   };
//   // chatForm.addEventListener("submit", (e) => {
//   //   e.preventDefault();

//   //   const input = e.target.elements.msg;
//   //   const msg = input.value;
//   //   console.log(msg);

//   //   // emit a msg to the server
//   //   socket.emit("chatMessage", msg);
//   //   input.value = "";
//   //   input.focus();
//   // });

//   return (
//     <div className="App">
//       <div className="chat-container">
//         <header className="chat-header">
//           <h1>
//             <i className="fas fa-smile"></i> ChatCord
//           </h1>
//           <a id="leave-btn" className="btn" href="/">
//             Leave Room
//           </a>
//         </header>
//         <main className="chat-main">
//           <div className="chat-sidebar">
//             <h3>
//               <i className="fas fa-comments"></i> Room Name:
//             </h3>
//             {/* // eslint-disable-next-line */}
//             <h2 id="room-name">{roomName}</h2>
//             <h3>
//               <i className="fas fa-users"></i> Users
//             </h3>
//             <ul id="users"></ul>
//           </div>
//           <div className="chat-messages"></div>
//         </main>
//         <div className="chat-form-container">
//           <form id="chat-form" onSubmit={handleSubmit}>
//             <input
//               id="msg"
//               type="text"
//               placeholder="Enter Message"
//               required
//               autoComplete="off"
//             />
//             <button className="btn">
//               <i className="fas fa-paper-plane"></i> Send
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default App;

import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3001/";

function App() {
  const [response, setResponse] = useState("");

  useEffect(() => {
    const socket = socketIOClient(ENDPOINT, {
      transports: ["websocket", "polling", "flashsocket"],
    });
    socket.on("FromAPI", (data) => {
      setResponse(data);
    });
  }, []);

  return (
    <p>
      It's <time dateTime={response}>{response}</time>
    </p>
  );
}

export default App;
