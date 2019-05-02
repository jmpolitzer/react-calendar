import * as React from "react";
import useCalendar from "../hooks/useCalendar";
import { Day, Month, Year } from "./index";

const { useState } = React;

function Calendar() {
  const [currentView, setCurrentView] = useState("month");
  const {
    activeDate,
    setDate,
    getMonth,
    goToNextMonth,
    goToPreviousMonth,
    getYear,
    goToNextYear,
    goToPreviousYear
  } = useCalendar();
  const currentMonth = getMonth(); // useCallback
  const currentYear = getYear(); // useCallback

  const changeView = (view: string, date?: Date) => {
    date && setDate(date);
    setCurrentView(view);
  };

  return (
    <div>
      {currentView === "day" && (
        <div className="day">
          <Day day={activeDate} changeView={changeView} />
        </div>
      )}
      {currentView === "month" && (
        <div className="month">
          <Month
            month={currentMonth}
            changeView={changeView}
            isFocused
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
