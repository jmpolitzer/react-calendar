import * as React from "react";
import { CalendarEventComponentPropsInterface } from "../interfaces";
import mapIntervalsToDates from "../helpers/mapIntervalsToDates";

const { useState } = React;

function CalendarEvent(props: CalendarEventComponentPropsInterface) {
  const { currentEvent, resizeEvent, month, year, dayOfWeek } = props;
  const [isResizable, setIsResizable] = useState(false);
  const isDescending = currentEvent[0] > currentEvent[1];
  const intervalRange = mapIntervalsToDates(
    currentEvent,
    year,
    month,
    dayOfWeek
  );

  const checkIsClickable = (e: MouseEvent) => {
    const { top, bottom } = e.target.parentNode.getBoundingClientRect();
    const isClickableTop = e.clientY < top + 5;
    const isClickableBottom = e.clientY > bottom - 5;
    const isClickable = isClickableTop || isClickableBottom;

    return isClickable;
  };

  const handleResize = (e: MouseEvent) => {
    checkIsClickable(e) && resizeEvent(e);
  };

  return (
    <div
      onMouseDown={e => handleResize(e)}
      onMouseOver={e => setIsResizable(checkIsClickable(e))}
      onMouseMove={e => setIsResizable(checkIsClickable(e))}
      className={`${isResizable ? "event" : ""}`}
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
