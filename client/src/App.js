import React from "react";
// import socketIOClient from "socket.io-client";
import "./App.css";
import ChatThread from "./pages/ChatThread";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import JoinRoom from "./pages/JoinRoom";
function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route exact path="/">
            <JoinRoom />
          </Route>
          <Route path="/chat/:username/:room">
            <ChatThread />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
