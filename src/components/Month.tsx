import * as React from "react";
import { Navigation } from "./index";
import {
  MonthHeaderInterface,
  MonthComponentPropsInterface,
  DayInterface
} from "../interfaces";

function Month(props: MonthComponentPropsInterface) {
  const {
    month: currentMonth,
    changeView,
    isMonthView,
    goToPreviousMonth,
    goToNextMonth
  } = props;
  const { headers, weeks, month, year } = currentMonth;

  return (
    <div className="month">
      <div className="month-nav">
        {isMonthView && (
          <div>
            <button onClick={goToPreviousMonth}>&laquo;</button>
          </div>
        )}
        <h1>
          <span
            className={!isMonthView ? "clickable" : ""}
            onClick={() =>
              !isMonthView
                ? changeView("month", new Date(parseInt(year), month.index, 1))
                : null
            }
          >
            {month.stringName}{" "}
          </span>
          {isMonthView && (
            <span className="clickable" onClick={() => changeView("year")}>
              {year}
            </span>
          )}
        </h1>
        {isMonthView && (
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
                  <div
                    className="month-square clickable"
                    key={j}
                    onClick={() => changeView("day", day.date)}
                  >
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
