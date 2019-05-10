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

  const getMonthNavHeader = () => {
    return (
      <h1>
        <span>{month.stringName} </span>
        <span className="clickable" onClick={() => changeView("year")}>
          {year}
        </span>
      </h1>
    );
  };

  return (
    <div className="month">
      {isMonthView ? (
        <Navigation
          previous={goToPreviousMonth}
          next={goToNextMonth}
          title={getMonthNavHeader()}
        />
      ) : (
        <div>
          <h1
            className="clickable"
            onClick={() =>
              changeView("month", new Date(parseInt(year), month.index, 1))
            }
          >
            {month.stringName}
          </h1>
        </div>
      )}
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
                const isToday =
                  day.date.toDateString() === new Date().toDateString();

                return (
                  <div
                    className={`month-square clickable ${
                      isToday ? "current" : ""
                    }`}
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
