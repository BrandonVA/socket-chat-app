import React, { useState } from "react";
import { Link } from "react-router-dom";

const JoinRoom = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("JavaScript");

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);
    console.log(value);
    setUsername(value);
  };
  const handleSelectChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name);
    console.log(value);
    setRoom(value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(room);
  };
  return (
    <div className="join-container">
      <header className="join-header">
        <h1>
          <i className="fas fa-smile"></i> ChatCord
        </h1>
      </header>
      <main className="join-main">
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              id="username"
              placeholder="Enter username..."
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="form-control">
            <label htmlFor="room">Room</label>
            <select name="room" id="room" onChange={handleSelectChange}>
              <option value="JavaScript">JavaScript</option>
              <option value="Python">Python</option>
              <option value="PHP">PHP</option>
              <option value="C#">C#</option>
              <option value="Ruby">Ruby</option>
              <option value="Java">Java</option>
            </select>
          </div>
          <Link to={`/chat/${username}/${room}`}>
            <button type="submit" className="btn">
              Join Chat
            </button>
          </Link>
        </form>
      </main>
    </div>
  );
};

export default JoinRoom;
