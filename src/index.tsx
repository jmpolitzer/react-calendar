import * as React from "react";
import { render } from "react-dom";
import { Calendar } from "./components/index";

import "./styles.css";

const { useState } = React;
const dbEvents = [
  {
    start: new Date(2019, 4, 17, 0, 30),
    end: new Date(2019, 4, 17, 2, 45),
    description: "A new event!"
  }
];

function App() {
  const [events, setEvents] = useState(dbEvents);

  const saveEvent = (event: any) => {
    setEvents(events => events.concat(event));
  };

  return (
    <div className="App">
      <Calendar events={events} saveEvent={saveEvent} />
    </div>
  );
}

const rootElement = document.getElementById("root");
render(<App />, rootElement);
