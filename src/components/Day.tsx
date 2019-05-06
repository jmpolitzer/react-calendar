import * as React from "react";
import { DayComponentPropsInterface } from "../interfaces";

function Day(props: DayComponentPropsInterface) {
  const { day, changeView, goToPreviousDay, goToNextDay } = props;
  const { dayOfWeek, month, year } = day;

  return (
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
  );
}

export default Day;
