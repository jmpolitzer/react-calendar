import * as React from "react";
import { DayComponentPropsInterface } from "../interfaces";

const { Fragment } = React;

function Day(props: DayComponentPropsInterface) {
  const {
    day,
    changeView,
    isDayView,
    goToPreviousDay,
    goToNextDay,
    isMilitary = false
  } = props;
  const { dayOfWeek, month, year, day: currentDay } = day;

  const formatTime = (date: Date, index: number) => {
    const militaryHour = date.getHours();
    const minutes = date.getMinutes();
    const standardHour =
      militaryHour === 0
        ? 12
        : militaryHour < 13
        ? militaryHour
        : militaryHour - 12;
    const hour = isMilitary ? militaryHour : standardHour;

    return index % 4 === 0 ? hour : minutes;
  };

  return (
    <div>
      {isDayView && <button onClick={() => changeView("week")}>Week</button>}
      {isDayView && (
        <div className="day-nav">
          <button onClick={goToPreviousDay}>&laquo;</button>
          <div className={"day-headers"}>
            <div onClick={() => changeView("month")} className={"clickable"}>
              {month}
            </div>
            <div>{dayOfWeek},</div>
            <div onClick={() => changeView("year")} className={"clickable"}>
              {year}
            </div>
          </div>
          <button onClick={goToNextDay}>&raquo;</button>
        </div>
      )}
      <div>
        {currentDay.map((hour, i) => {
          return (
            <div key={i} className="quarter">
              {hour.map((quarter: Date, j: number) => {
                const isHour = j % 4 === 0;
                const showEvening =
                  isHour && !isMilitary && quarter.getHours() > 12;

                return (
                  <Fragment key={j}>
                    <div className="quarter-line" />
                    <div className={`${isHour ? "hour" : "minutes"}`}>
                      <div>{formatTime(quarter, j)}</div>
                      {showEvening && <div className="evening">p</div>}
                    </div>
                  </Fragment>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Day;
