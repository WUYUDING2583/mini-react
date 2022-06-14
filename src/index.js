import React from "react";

const root = document.getElementById("root");
const h1 = document.createElement("h1");
h1.innerHTML = "This is mini-react from yuyi.";
const a = document.createElement("a");
a.innerHTML = "Find more";
a.setAttribute("href", "https://github.com/yuyi2583/mini-react");

root.appendChild(h1);
root.appendChild(a);
