import * as React from "react";
import { render } from "react-dom";
import { Calendar } from "./components/index";

import "./styles.css";

const events = [
  {
    start: new Date(2019, 5, 13, 13, 30),
    end: new Date(2019, 5, 13, 5, 45),
    description: "A new event!"
  }
];

function App() {
  return (
    <div className="App">
      <Calendar events={events} />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
