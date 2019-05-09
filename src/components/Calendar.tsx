import * as React from "react";
import useCalendar from "../hooks/useCalendar";
import { Day, Week, Month, Year } from "./index";

const { useState } = React;

function Calendar() {
  const [currentView, setCurrentView] = useState("month");
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
    goToPreviousWeek
  } = useCalendar();
  const currentMonth = getMonth(); // useCallback
  const currentYear = getYear(); // useCallback
  const currentDay = getDay(); // useCallback
  const currentWeek = getWeek(); // useCallback

  const changeView = (view: string, date?: Date) => {
    date && setDate(date);
    setCurrentView(view);
  };

  return (
    <div>
      {currentView === "day" && (
        <div className="day">
          <Day
            day={currentDay}
            changeView={changeView}
            isDayView
            goToNextDay={goToNextDay}
            goToPreviousDay={goToPreviousDay}
          />
        </div>
      )}
      {currentView === "week" && (
        <div className="week">
          <Week
            week={currentWeek}
            changeView={changeView}
            goToNextWeek={goToNextWeek}
            goToPreviousWeek={goToPreviousWeek}
          />
        </div>
      )}
      {currentView === "month" && (
        <div className="month">
          <Month
            month={currentMonth}
            changeView={changeView}
            isMonthView
            goToNextMonth={goToNextMonth}
            goToPreviousMonth={goToPreviousMonth}
          />
        </div>
      )}
      {currentView === "year" && (
        <div className="year">
          <Year
            year={currentYear}
            changeView={changeView}
            goToNextYear={goToNextYear}
            goToPreviousYear={goToPreviousYear}
          />
        </div>
      )}
    </div>
  );
}

export default Calendar;
