import {
  ReactDOM,
  // Component
} from "../which-react";
import "./index.css";

// function FunctionComponent(props) {
//   return (
//     <div className="border">
//       <p>{props.name}</p>
//     </div>
//   );
// }

// class ClassComponent extends Component {
//   render() {
//     return (
//       <div className="border">
//         <h3>{this.props.name}</h3>
//         this is text
//       </div>
//     );
//   }
// }

const jsx = (
  <div className="border">
    <h1>react</h1>
    <a href="https://github.com/yuyi2583/mini-react">mini react</a>
    {/* <FunctionComponent name="function component" />
    <ClassComponent name="class component" /> */}
  </div>
);

ReactDOM.createRoot(document.getElementById("root")).render(jsx);
