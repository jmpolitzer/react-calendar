import * as React from "react";
import { Day } from "./index";
import { WeekComponentPropsInterface } from "../interfaces";

function Week(props: WeekComponentPropsInterface) {
  const { week, changeView, goToNextWeek, goToPreviousWeek } = props;
  const { headers, week: currentWeek } = week;
  const firstDay = currentWeek[0];
  const lastDay = currentWeek[currentWeek.length - 1];

  return (
    <div>
      <div className="week-nav">
        <button onClick={goToPreviousWeek}>&laquo;</button>
        <div className="week-nav-header">
          <div className="clickable" onClick={() => changeView("month")}>
            {firstDay.month}
          </div>
          <div className="weekday-range">
            {`${firstDay.dayOfWeek} - ${lastDay.dayOfWeek},`}
          </div>
          <div className="clickable" onClick={() => changeView("year")}>
            {lastDay.year}
          </div>
        </div>
        <button onClick={goToNextWeek}>&raquo;</button>
      </div>
      <div className="week">
        {currentWeek.map((day, i) => {
          const { dayOfWeek, date } = day;

          return (
            <div key={i} className="weekday">
              <div className="weekday-header">
                <div
                  className="clickable"
                  onClick={() => changeView("day", date)}
                >
                  {headers[i].long}
                </div>
                <div
                  className="clickable"
                  onClick={() => changeView("day", date)}
                >
                  {dayOfWeek}
                </div>
              </div>
              <Day day={day} changeView={changeView} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Week;
