// import React from "react";
import { str } from "./string";

function FunctionComponent(props) {
  return <div className="border">{/* <p>{props.nam}</p> */}</div>;
}

const root = document.getElementById("root");
const h1 = document.createElement("h1");
h1.innerHTML = str;
const a = document.createElement("a");
a.innerHTML = "Find more";
a.setAttribute("href", "https://github.com/yuyi2583/mini-react");

root.appendChild(h1);
root.appendChild(a);
