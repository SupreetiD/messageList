import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import MessageList from "./MessageList.js";
import "./App.css";

ReactDOM.render(<App />, document.getElementById("root"));
ReactDOM.render(<MessageList />, document.getElementById("message"));
