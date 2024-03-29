// import { useReducer } from "react";
import { ReactDOM, Component, useReducer } from "../which-react";
import "./index.css";

function FunctionComponent(props) {
  const [count, setCount] = useReducer((x) => x + 1, 0);
  return (
    <div className="border">
      <p>{props.name}</p>
      <button onClick={() => setCount()}>{count}</button>
    </div>
  );
}

class ClassComponent extends Component {
  render() {
    return (
      <div className="border">
        <h3>{this.props.name}</h3>
        this is text
      </div>
    );
  }
}

function FragmentComponent() {
  return (
    <ul>
      <>
        <li>fragment 1</li>
        <li>fragmentt 2</li>
      </>
    </ul>
  );
}

const jsx = (
  <div className="border">
    <h1>react</h1>
    <a href="https://github.com/yuyi2583/mini-react">mini react</a>
    <FunctionComponent name="function component" />
    {/* <ClassComponent name="class component" /> */}
    {/* <FragmentComponent /> */}
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(jsx);
