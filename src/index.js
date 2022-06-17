import React from "react";
import ReactDOM from "react-dom/client";
import render from "../modules/react-dom/render";
import { str } from "./string";

function FunctionComponent({ name }) {
  return (
    <div className="border">
      <h1>{name}</h1>
      <a href="https://github.com/yuyi2583/mini-react">Find more</a>
    </div>
  );
}

const root = document.getElementById("root");

render(<FunctionComponent name={str} />, root);
