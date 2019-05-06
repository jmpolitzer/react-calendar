import * as React from "react";
import { DayComponentPropsInterface } from "../interfaces";

function Day(props: DayComponentPropsInterface) {
  const { day, changeView, goToPreviousDay, goToNextDay } = props;
  const { dayOfWeek, month, year, day: currentDay } = day;

  return (
    <div>
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
      <div>
        {currentDay.map((hour, i) => {
          return (
            <div key={i}>
              {hour.map((quarter: Date, j: number) => {
                return <div key={j}>{quarter.toString()}</div>;
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Day;
