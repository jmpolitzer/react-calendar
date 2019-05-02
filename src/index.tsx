import * as React from "react";
import { render } from "react-dom";
import { Calendar } from "./components";

import "./styles.css";

function App() {
  return (
    <div className="App">
      <Calendar />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
