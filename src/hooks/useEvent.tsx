import * as React from "react";

const { useState, useEffect } = React;

function useEvent() {
  const [isResizable, setIsResizable] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({
    id: "id",
    start: new Date(),
    intervals: []
  });

  useEffect(() => {
    document.addEventListener("mousemove", checkForResizability);
    document.addEventListener("mouseover", checkForResizability);

    return () => {
      document.removeEventListener("mousemove", checkForResizability);
      document.removeEventListener("mouseover", checkForResizability);
    };
  }, []);

  const isInterval = (e: MouseEvent) => {
    const { className } = e.target as HTMLElement;
    const intervalClasses = ["hour", "minutes"];

    return intervalClasses.includes(className);
  };

  const isClickable = (e: MouseEvent) => {
    const parent = e.target.parentNode;

    if (parent.getBoundingClientRect) {
      const { bottom } = parent.getBoundingClientRect();

      return e.clientY > bottom - 5;
    } else {
      return false;
    }
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

  const createEvent = (e: MouseEvent) => {
    if (isInterval(e)) {
      const date = getDateAttr(e);

      date &&
        setCurrentEvent({
          id: "id",
          start: date.start,
          intervals: [date.interval]
        });

      document.addEventListener("mousemove", modifyEvent);
      document.addEventListener("mouseup", resetCurrentEvent);
    }

    e.preventDefault();
  };

  const modifyEvent = (e: MouseEvent) => {
    setIsResizable(isClickable(e));

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

  const checkForResizability = (e: MouseEvent) => {
    setIsResizable(isClickable(e));
  };

  const resetCurrentEvent = (e: MouseEvent) => {
    document.removeEventListener("mousemove", modifyEvent);
    document.removeEventListener("mouseup", resetCurrentEvent);

    setCurrentEvent({
      id: "id",
      start: new Date(),
      intervals: []
    });

    e.preventDefault();
  };

  const resizeEvent = (e: MouseEvent, event) => {
    if (isClickable(e)) {
      setCurrentEvent(event);

      document.addEventListener("mousemove", modifyEvent);
      document.addEventListener("mouseup", resetCurrentEvent);
    }
  };

  return {
    createEvent,
    resizeEvent,
    isResizable,
    currentEvent
  };
}

export default useEvent;
