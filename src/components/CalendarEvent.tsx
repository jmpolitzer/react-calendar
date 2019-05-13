import * as React from "react";
import { CalendarEventComponentPropsInterface } from "../interfaces";

function CalendarEvent(props: CalendarEventComponentPropsInterface) {
  const { currentEvent, quarter, year, dayOfWeek } = props;
  const isDescending = currentEvent[0] > currentEvent[1];
  const getHour = (interval: string) =>
    interval.length === 3 ? interval.slice(0, 1) : interval.slice(0, 2);
  const getMinutes = (interval: string) =>
    interval.length === 3
      ? interval.slice(1, interval.length)
      : interval.slice(2, interval.length);
  const intervalRange = currentEvent.map(
    (interval: string) =>
      new Date(
        parseInt(year, 10),
        quarter.getMonth(),
        parseInt(dayOfWeek, 10),
        parseInt(getHour(interval), 10),
        parseInt(getMinutes(interval), 10)
      )
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
