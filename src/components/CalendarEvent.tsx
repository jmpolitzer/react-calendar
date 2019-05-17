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
  const handleResize = (e: MouseEvent) => {
    const { top, bottom, height } = e.target.getBoundingClientRect();
    const isClickableTop = e.clientY < top + 10;
    const isClickableBottom = e.clientY > bottom - 10;

    (isClickableTop || isClickableBottom) &&
      console.log(e.clientY, top, bottom);
  };

  return (
    <div
      onMouseDown={e => handleResize(e)}
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
