import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import localforage from "localforage";

localforage.config({
  driver: localforage.WEBSQL,
  name: "notes_and_todo",
  version: 1.0,
  storeName: "your_store",
  description: "Your LocalForage Configuration",
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
