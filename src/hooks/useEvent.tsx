import * as React from "react";

const { useState } = React;

function useEvent() {
  const [currentEvent, setCurrentEvent] = useState([]);

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
    date && setCurrentEvent([date]);

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    const date = getDateAttr(e);
    date &&
      setCurrentEvent(quarters =>
        quarters.filter(quarter => quarter !== date).concat(date)
      );

    e.preventDefault();
  };

  const handleMouseUp = (e: MouseEvent) => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);

    /*
      TODO:
      1. Display form for event details
      2. Expose method to save array in external data store 
    */

    e.preventDefault();
  };

  return {
    createEvent: handleMouseDown,
    currentEvent
  };
}

export default useEvent;
