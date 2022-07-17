import React, { Component } from "react";
import { createRoot } from "../modules/react-dom/ReactDOMRoot";
import App from "./App";

const root = createRoot(document.getElementById("root"));

root.render(<App />);
