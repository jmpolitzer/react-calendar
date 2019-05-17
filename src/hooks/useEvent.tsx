import * as React from "react";

const { useState } = React;

function useEvent() {
  const [currentEvent, setCurrentEvent] = useState({
    start: new Date(),
    intervals: []
  });

  const isInterval = (e: MouseEvent) => {
    const { className } = e.target as HTMLElement;
    const intervalClasses = ["hour", "minutes"];

    return intervalClasses.includes(className);
  };

  const getDateAttr = (e: MouseEvent) => {
    const { attributes } = e.target as HTMLElement;

    if (attributes["data-date"]) {
      const date = new Date(attributes["data-date"].nodeValue);
      const hour = date.getHours();
      const minutes = date.getMinutes() === 0 ? "00" : date.getMinutes();

      return { start: date, interval: `${hour}${minutes}` };
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    if (isInterval(e)) {
      const date = getDateAttr(e);
      date &&
        setCurrentEvent({ start: date.start, intervals: [date.interval] });

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    }

    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    const date = getDateAttr(e);

    date &&
      setCurrentEvent(event => {
        const { intervals } = event;
        const { interval } = date;
        const lastQuarter = parseInt(intervals[intervals.length - 1], 10);
        const secondToLastQuarter = parseInt(
          intervals[intervals.length - 2],
          10
        );
        const isGoingReverse =
          (lastQuarter > secondToLastQuarter &&
            parseInt(interval, 10) < lastQuarter) ||
          (lastQuarter < secondToLastQuarter &&
            parseInt(interval, 10) > lastQuarter);
        const updatedIntervals = intervals.includes(interval)
          ? isGoingReverse
            ? intervals.filter(quarter => parseInt(quarter, 10) !== lastQuarter)
            : intervals
          : intervals.filter(quarter => quarter !== interval).concat(interval);

        return { ...event, intervals: updatedIntervals };
      });

    e.preventDefault();
  };

  const handleMouseUp = (e: MouseEvent) => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    setCurrentEvent({
      start: new Date(),
      intervals: []
    });

    /*
    TODO:
    1. Display form for event details
    */

    e.preventDefault();
  };

  const resizeEvent = (e: MouseEvent) => {
    console.log(e);
  };

  return {
    createEvent: handleMouseDown,
    resizeEvent,
    currentEvent
  };
}

export default useEvent;
