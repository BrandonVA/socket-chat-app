import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import socketIOClient from "socket.io-client";
import "../App.css";

function ChatThread() {
  console.log(window.location);
  const [roomName, setRoomName] = useState("");
  const [userList, setUserList] = useState([]);
  const [chat, setChat] = useState([]);
  const socketRef = useRef();
  const chatMessages = useRef();
  //   const { username, currentRoom } = useParams();
  const { room, username } = useParams();
  const ENDPOINT = `${window.location.protocol}//${window.location.hostname}:3001/`; //"http://localhost:3001/";
  console.log(ENDPOINT);

  const outputRoomName = (room) => {
    // roomName.innerText = room;
    setRoomName(room);
  };

  const outputUsers = (users) => {
    setUserList(users);
  };
  // output message to DOM
  const outputMessage = (message) => {
    setChat((chat) => [...chat, message]);
  };

  useEffect(() => {
    console.log(username, room);
    socketRef.current = socketIOClient(ENDPOINT, {
      //   query: `room = ${room}`,
      transports: ["websocket", "polling", "flashsocket"],
    });
    // socketRef.current = socketIOClient();
    // Join chatroom
    socketRef.current.emit("joinRoom", { username, room });

    socketRef.current.on("message", (message) => {
      console.log(message);
      outputMessage(message);
      chatMessages.current.scrollTop = chatMessages.current.scrollHeight;
    });

    socketRef.current.on("roomUsers", ({ room, users }) => {
      outputRoomName(room);
      outputUsers(users);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const input = e.target.elements.msg;
    const msg = input.value;

    // emit a msg to the server
    socketRef.current.emit("chatMessage", msg);
    input.value = "";
    input.focus();
  };

  return (
    <div className="ChatThread">
      <div className="chat-container">
        <header className="chat-header">
          <h1>
            <i className="fas fa-smile"></i> ChatCord
          </h1>
          <a id="leave-btn" className="btn" href="/">
            Leave Room
          </a>
        </header>
        <main className="chat-main">
          <div className="chat-sidebar">
            <h3>
              <i className="fas fa-comments"></i> Room Name:
            </h3>
            <h2 id="room-name">{roomName}</h2>
            <h3>
              <i className="fas fa-users"></i> Users
            </h3>
            <ul id="users">
              {userList.map((item, index) => (
                <li key={index}>{item.username}</li>
              ))}
            </ul>
          </div>
          <div className="chat-messages" ref={chatMessages}>
            {chat.map((item, index) => (
              <div className="message" key={index}>
                <p className="meta">
                  {item.username} <span>{item.time}</span>
                </p>
                <p className="text">{item.text}</p>
              </div>
            ))}
          </div>
        </main>
        <div className="chat-form-container">
          <form id="chat-form" onSubmit={handleSubmit}>
            <input
              id="msg"
              type="text"
              placeholder="Enter Message"
              required
              autoComplete="off"
            />
            <button className="btn">
              <i className="fas fa-paper-plane"></i> Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ChatThread;
