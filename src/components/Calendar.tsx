import * as React from "react";
import useCalendar from "../hooks/useCalendar";
import useEvent from "../hooks/useEvent";
import { Day, Week, Month, Year } from "./index";
import { CalendarComponentPropsInterface } from "../interfaces";

const { useState } = React;

function Calendar(props: CalendarComponentPropsInterface) {
  const { events, saveEvent } = props;
  const [currentView, setCurrentView] = useState("day");
  const { currentEvent, createEvent } = useEvent();
  const {
    setDate,
    getMonth,
    goToNextMonth,
    goToPreviousMonth,
    getYear,
    goToNextYear,
    goToPreviousYear,
    getDay,
    goToNextDay,
    goToPreviousDay,
    getWeek,
    goToNextWeek,
    goToPreviousWeek,
    getEventsForDay,
    getEventsForWeek,
    getEventsForMonth,
    getEventsForYear
  } = useCalendar();

  const changeView = (view: string, date?: Date) => {
    date && setDate(date);
    setCurrentView(view);
  };

  return (
    <div>
      {currentView === "day" && (
        <div className="day">
          <Day
            day={getDay()}
            changeView={changeView}
            isDayView
            goToNextDay={goToNextDay}
            goToPreviousDay={goToPreviousDay}
            currentEvent={currentEvent}
            createEvent={createEvent}
            saveEvent={saveEvent}
            events={getEventsForDay(events)}
          />
        </div>
      )}
      {currentView === "week" && (
        <div className="week">
          <Week
            week={getWeek()}
            changeView={changeView}
            goToNextWeek={goToNextWeek}
            goToPreviousWeek={goToPreviousWeek}
            currentEvent={currentEvent}
            createEvent={createEvent}
            saveEvent={saveEvent}
            events={getEventsForWeek(events)}
          />
        </div>
      )}
      {currentView === "month" && (
        <div className="month">
          <Month
            month={getMonth()}
            changeView={changeView}
            isMonthView
            goToNextMonth={goToNextMonth}
            goToPreviousMonth={goToPreviousMonth}
            events={getEventsForMonth(events)}
          />
        </div>
      )}
      {currentView === "year" && (
        <div className="year">
          <Year
            year={getYear()}
            changeView={changeView}
            goToNextYear={goToNextYear}
            goToPreviousYear={goToPreviousYear}
            events={getEventsForYear(events)}
          />
        </div>
      )}
    </div>
  );
}

export default Calendar;
