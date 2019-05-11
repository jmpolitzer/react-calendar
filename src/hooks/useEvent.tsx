import * as React from "react";

const { useState } = React;

function useEvent() {
  const [eventStart, setEventStart] = useState("");
  const [eventEnd, setEventEnd] = useState("");
  const [currentIntervalLocation, setCurrentIntervalLocation] = useState("");

  const getDateAttr = (e: MouseEvent) => {
    const { attributes } = e.target as HTMLElement;

    if (attributes["data-date"]) {
      const date = new Date(attributes["data-date"].nodeValue);
      const hour = date.getHours();
      const minutes = date.getMinutes() === 0 ? "00" : date.getMinutes();

      return `${hour}:${minutes}`;
    }
  };

  const handleMouseDown = (e: MouseEvent) => {
    const date = getDateAttr(e);
    date && setEventStart(date);

    setEventEnd("");
    setCurrentIntervalLocation("");

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    const date = getDateAttr(e);

    if (date) {
      currentIntervalLocation === ""
        ? setCurrentIntervalLocation(date)
        : date !== currentIntervalLocation && setCurrentIntervalLocation(date);
    }

    e.preventDefault();
  };

  const handleMouseUp = (e: MouseEvent) => {
    const date = getDateAttr(e);
    date && setEventEnd(date);

    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    e.preventDefault();
  };

  return {
    createEvent: handleMouseDown,
    eventStart,
    eventEnd,
    currentIntervalLocation
  };
}

export default useEvent;
