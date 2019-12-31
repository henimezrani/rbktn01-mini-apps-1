import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";
import Board from "./components/board.jsx"

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <Board />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('App'));

