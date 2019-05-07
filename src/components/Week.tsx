import * as React from "react";
import { Day } from "./index";
import { WeekComponentPropsInterface } from "../interfaces";

function Week(props: WeekComponentPropsInterface) {
  const { week, changeView, goToNextWeek, goToPreviousWeek } = props;
  const { headers, week: currentWeek } = week;

  return (
    <div>
      <div className="week-nav">
        <button onClick={goToPreviousWeek}>&laquo;</button>
        <div>
          <div>{`${currentWeek[0].date.toDateString()} - ${currentWeek[
            currentWeek.length - 1
          ].date.toDateString()}`}</div>
        </div>
        <button onClick={goToNextWeek}>&raquo;</button>
      </div>
      <div className="week">
        {currentWeek.map((day, i) => {
          const { dayOfWeek } = day;

          return (
            <div key={i} className="weekday">
              <div className="weekday-header">
                <div>{headers[i].long}</div>
                <div>{dayOfWeek}</div>
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
