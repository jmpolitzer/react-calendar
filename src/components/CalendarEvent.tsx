import * as React from "react";
import { CalendarEventComponentPropsInterface } from "../interfaces";
import mapIntervalsToDates from "../helpers/mapIntervalsToDates";

function CalendarEvent(props: CalendarEventComponentPropsInterface) {
  const { currentEvent, month, year, dayOfWeek } = props;
  const isDescending = currentEvent[0] > currentEvent[1];
  const intervalRange = mapIntervalsToDates(
    currentEvent,
    year,
    month,
    dayOfWeek
  );

  return (
    <div
      className="event"
      style={{
        position: "absolute",
        ...(isDescending && {
          transform: "rotate(180deg)",
          transformOrigin: "50% 23px"
        })
      }}
    >
      {intervalRange.map((interval: Date, i: number) => {
        return (
          <div
            key={i}
            className="event-interval"
            style={{
              ...(isDescending && {
                transform: "rotate(180deg)"
              })
            }}
            data-date={interval}
          >
            {isDescending
              ? i === currentEvent.length - 1 && "Event Interval"
              : i === 0 && "Event Interval!"}
          </div>
        );
      })}
    </div>
  );
}

export default CalendarEvent;
