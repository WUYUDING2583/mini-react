import React, { Component } from "react";
import ReactDOM from "react-dom/client";
import render from "../modules/react-dom/render";

function FunctionComponent({ name }) {
  return <h1>{name}</h1>;
}

class ClassComponent extends Component {
  render() {
    return <h1>{this.props.name}</h1>;
  }
}

const root = document.getElementById("root");

render(
  <>
    <FunctionComponent name="Function Component" />
    <ClassComponent name="Class Component" />
  </>,
  root
);
