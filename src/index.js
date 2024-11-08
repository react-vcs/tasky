import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { TODO_PROVIDER } from "./context/todoContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <TODO_PROVIDER>
    <App />
  </TODO_PROVIDER>
);
