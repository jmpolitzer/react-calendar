import * as React from "react";
import {
  MonthHeaderInterface,
  MonthComponentPropsInterface,
  DayInterface
} from "../interfaces";

function Month(props: MonthComponentPropsInterface) {
  const {
    month: currentMonth,
    changeView,
    isFocused,
    goToPreviousMonth,
    goToNextMonth
  } = props;
  const { headers, weeks, month, year } = currentMonth;

  return (
    <div className="month">
      <div className="month-nav">
        {isFocused && (
          <div>
            <button onClick={goToPreviousMonth}>&laquo;</button>
          </div>
        )}
        <h1>
          <span
            className={!isFocused ? "clickable" : ""}
            onClick={() =>
              !isFocused
                ? changeView("month", new Date(parseInt(year), month.index, 1))
                : null
            }
          >
            {month.stringName}{" "}
          </span>
          {isFocused && (
            <span className="clickable" onClick={() => changeView("year")}>
              {year}
            </span>
          )}
        </h1>
        {isFocused && (
          <div>
            <button onClick={goToNextMonth}>&raquo;</button>
          </div>
        )}
      </div>
      <div className="month-row month-headers">
        {headers.map((header: MonthHeaderInterface, i: number) => (
          <div className="month-square" key={i}>
            {header.single}
          </div>
        ))}
      </div>
      <div>
        {weeks.map((week: DayInterface[], i: number) => {
          return (
            <div className="month-row" key={i}>
              {week.map((day: DayInterface, j: number) => {
                return (
                  <div className="month-square" key={j}>
                    {month.index === day.date.getMonth() && day.dayOfWeek}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Month;
