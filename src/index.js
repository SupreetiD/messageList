import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import MessageList from "./MessageList.js";
import "./App.css";
import data from "./messages.json"

ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<MessageList />, document.getElementById("message"));
